package com.jsdckj.ttarawa.history.service;

import com.jsdckj.ttarawa.file.service.FileService;
import com.jsdckj.ttarawa.history.DistanceUtils;
import com.jsdckj.ttarawa.history.dto.req.HistoryReqDto;
import com.jsdckj.ttarawa.history.dto.req.HistoryUpdateReq;
import com.jsdckj.ttarawa.history.dto.res.HistoryResDto;
import com.jsdckj.ttarawa.history.dto.res.MyHistoryResDto;
import com.jsdckj.ttarawa.history.entity.History;
import com.jsdckj.ttarawa.history.repository.FavoriteRepository;
import com.jsdckj.ttarawa.history.repository.HistoryRepository;
import com.jsdckj.ttarawa.users.entity.Users;
import com.jsdckj.ttarawa.users.entity.UsersInfo;
import com.jsdckj.ttarawa.users.repository.UserInfoRepository;
import com.jsdckj.ttarawa.users.repository.UserRepository;
import com.jsdckj.ttarawa.users.service.UserInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static com.jsdckj.ttarawa.history.DistanceUtils.manhattanDistance;
import static com.jsdckj.ttarawa.history.DistanceUtils.toCoordinate;

@Service
@Transactional
@RequiredArgsConstructor
public class HistoryServiceImpl implements HistoryService {

	private final HistoryRepository historyRepository;
	private final UserRepository userRepository;
	private final UserInfoRepository userInfoRepository;
	private final UserInfoService userInfoService;
	private final FavoriteRepository favoriteRepository;
	private final FileService fileService;

	// 게시물 저장
	@Override
	public void insertHistory(Long userId, HistoryReqDto.HistoryInfoDto historyInfoDto) throws IOException {

		Users currentUser = userRepository.findById(userId).get(); // 현재 유저


		String url = fileService.uploadFile("history", historyInfoDto.getImage());

		// 게시물 저장
		historyRepository.save(toEntity(currentUser, historyInfoDto, url));

		// 내 주행 거리 늘리기
		UsersInfo userInfo = userInfoRepository.findByUsers(currentUser);
		Long newTotalDistance = userInfo.updateTotalDistance(historyInfoDto.getDistance());

		// 주행거리에 따른 뱃지 업데이트
		userInfoService.updateBadge(currentUser, newTotalDistance);
	}

	@Override
	public HistoryResDto selectOneHistory(Long userId, Long historyId) {
		Users currentUser = userRepository.findById(userId).get(); // 현재 유저

		Optional<History> history = historyRepository.findById(historyId);
		if (history.isPresent()) {

			History getHistory = history.get();
			Users historyUser = history.get().getUsers(); // 작성한 사람 찾기
			UsersInfo historyUserInfo = userInfoRepository.findByUsers(historyUser); // 작성한 사람 정보
			int favorite = (favoriteRepository.findByUsersAndHistory(currentUser, getHistory).isPresent()) ? 1 : 0; // 내가 좋아요를 눌렀는지

			return toHistoryResDto(getHistory, historyUser, historyUserInfo, favorite, userId);

		} else {
			return null;
		}
	}

	@Override
	public List<HistoryResDto> selectAllHistory(Long userId, Pageable pageable) {

		Users currentUser = userRepository.findById(userId).get();

		Page<History> allHistoryList = historyRepository.findAll(pageable);
		List<HistoryResDto> historyResDtoList = allHistoryList.stream()
				.filter(history -> history.getPersonal() == 0)
				.map(history -> toHistoryResDto(
						history,
						history.getUsers(),
						userInfoRepository.findByUsers(history.getUsers()),
						favoriteRepository.findByUsersAndHistory(currentUser, history).isPresent() ? 1 : 0, userId))
				.collect(Collectors.toList());

		return historyResDtoList;
	}

	@Override
	public List<HistoryResDto> selectAllHistoryByRecommend(Long userId, int size, double lat, double lng) {

		Users currentUser = userRepository.findById(userId).get();


		List<History> myHistoriesList = historyRepository.findAllByUsersId(userId); // 현재 유저의 모든 기록
		if (myHistoriesList.isEmpty()) {
			return null;
		}
		List<History> allHistories = historyRepository.findAllByUsersIdNotEqual(userId); // 다른 사람들의 기록

		// 사용자의 주행기록과 다른 사람들의 주행 기록 유사도 비교 -> 맨하탄 거리
		Map<Long, Double> similarityScores = new HashMap<>();
		for (History history : allHistories) {
			Long historyId = history.getHistoryId();
			Long distance = history.getDistance();
			Long time = history.getTime();
			Double similarityScore = 0.0;
			for (History myHistory : myHistoriesList) {
				similarityScore += 1.0 / (1.0 + manhattanDistance(myHistory.getTime(), myHistory.getDistance(), time, distance));
			}
			similarityScores.put(historyId, similarityScore);
		}

		// 유사도가 가까운 순으로 정렬
		List<History> sortedHistory = allHistories.stream()
				.sorted(Comparator.comparingDouble((History x) -> similarityScores.get(x.getHistoryId())).reversed())
				.collect(Collectors.toList());

		Map<Long, Double> distances = new HashMap<>();
		for (History history : sortedHistory) {
			Long historyId = history.getHistoryId();
			String startAddress = history.getStartAddress();
			Map<String, String> addressToCoordinate = toCoordinate(startAddress);

			if (addressToCoordinate == null) {
				continue;
			}

			double dist = DistanceUtils.getDistance(lat, lng, Double.parseDouble(addressToCoordinate.get("y")), Double.parseDouble(addressToCoordinate.get("x")));

			distances.put(historyId, dist);

		}

		allHistories = allHistories.stream().filter((History x) -> distances.containsKey((x.getHistoryId()))).collect(Collectors.toList());
		allHistories = allHistories.stream().sorted(Comparator.comparingDouble((History x) -> distances.get((x.getHistoryId())))).collect(Collectors.toList());

		return allHistories.stream()
				.filter(history -> history.getPersonal() == 0)
				.map(history -> toHistoryResDto(
						history,
						history.getUsers(),
						userInfoRepository.findByUsers(history.getUsers()),
						favoriteRepository.findByUsersAndHistory(currentUser, history).isPresent() ? 1 : 0, userId))
				.limit(size)
				.collect(Collectors.toList());

	}

	@Override
	public List<MyHistoryResDto> selectAllMyHistory(Long userId, Pageable pageable) {

		Users currentUser = userRepository.findById(userId).get();
		Page<History> allMyHistoryList = historyRepository.findAllByUsers(currentUser, pageable);
		List<MyHistoryResDto> historyResDtoList = allMyHistoryList.stream()
				.map(history -> toMyHistoryResDto(history, favoriteRepository.findByUsersAndHistory(currentUser, history).isPresent() ? 1 : 0))
				.collect(Collectors.toList());


		return historyResDtoList;
	}

	// 게시물 수정
	@Override
	public boolean updateHistory(Long userId, Long historyId, HistoryUpdateReq historyUpdateReq) {


		History history = historyRepository.findById(historyId).get();

		// 나인지 확인
		if (history.getUsers() == userRepository.findById(userId).get()) {
			history.updateHistory(historyUpdateReq.getPersonal(), historyUpdateReq.getContent());
			return true;

		} else {
			return false;
		}

	}


	// 게시물 삭제
	@Override
	public void deleteHistory(Long userId, Long historyId) {
		fileService.deleteFile("history", historyRepository.findById(historyId).get().getImage());

		historyRepository.deleteByHistoryId(historyId);

	}


}