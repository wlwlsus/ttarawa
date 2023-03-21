package com.jsdckj.ttarawa.history.service;

import com.jsdckj.ttarawa.file.service.FileUploadService;
import com.jsdckj.ttarawa.history.dto.req.HistoryReqDto;
import com.jsdckj.ttarawa.history.dto.req.HistoryUpdateReq;
import com.jsdckj.ttarawa.history.dto.res.HistoryResDto;
import com.jsdckj.ttarawa.history.dto.res.MyHistoryResDto;
import com.jsdckj.ttarawa.history.entity.Favorites;
import com.jsdckj.ttarawa.history.entity.History;
import com.jsdckj.ttarawa.history.repository.FavoriteRepository;
import com.jsdckj.ttarawa.history.repository.HistoryRepository;
import com.jsdckj.ttarawa.users.entity.Users;
import com.jsdckj.ttarawa.users.entity.UsersInfo;
import com.jsdckj.ttarawa.users.repository.UserInfoRepository;
import com.jsdckj.ttarawa.users.repository.UserRepository;
import com.jsdckj.ttarawa.users.service.UserInfoService;
import com.nimbusds.openid.connect.sdk.claims.UserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class HistoryServiceImpl implements HistoryService {

  private final HistoryRepository historyRepository;
  private final UserRepository userRepository;
  private final UserInfoRepository userInfoRepository;
  private final UserInfoService userInfoService;
  private final FavoriteRepository favoriteRepository;
  private final FileUploadService fileUploadService;

  // 게시물 저장
  @Override
  public void insertHistory(Long userId, MultipartFile img, HistoryReqDto historyReqDto) throws IOException {

    Users currentUser = userRepository.findById(userId).get(); // 현재 유저


    String url = fileUploadService.uploadFile("history", img);

    // 게시물 저장

    historyRepository.save(toEntity(currentUser, historyReqDto, url));


    // 내 주행 거리 늘리기
    UsersInfo userInfo = userInfoRepository.findByUsers(currentUser);
    Long newTotalDistance = userInfo.updateTotalDistance(historyReqDto.getDistance());

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

      return toHistoryResDto(getHistory, historyUser, historyUserInfo, favorite);

    } else {
      return null;
    }
  }

  @Override
  public List<HistoryResDto> selectAllHistory(Long userId, Pageable pageable) {

    Users currentUser = userRepository.findById(userId).get();

    Page<History> allHistoryList = historyRepository.findAll(pageable);
    List<HistoryResDto> historyResDtoList = allHistoryList.stream()
        .filter(history -> history.getPersonal()==0)
        .map(history -> toHistoryResDto(
            history,
            history.getUsers(),
            userInfoRepository.findByUsers(history.getUsers()),
            favoriteRepository.findByUsersAndHistory(currentUser, history).isPresent() ? 1 : 0))
        .collect(Collectors.toList());

    return historyResDtoList;
  }

  @Override
  public List<MyHistoryResDto> selectAllMyHistory(Long userId, Pageable pageable) {

    Users currentUser = userRepository.findById(userId).get();
    Page<History> allMyHistoryList = historyRepository.findAllByUsers(currentUser, pageable);
    List<MyHistoryResDto> historyResDtoList = allMyHistoryList.stream()
        .map(history -> toMyHistoryResDto(history))
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

    historyRepository.deleteByHistoryId(historyId);

  }
}