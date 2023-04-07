package com.jsdckj.ttarawa.history.service;

import com.jsdckj.ttarawa.history.dto.req.HistoryReqDto;
import com.jsdckj.ttarawa.history.dto.req.HistoryUpdateReq;
import com.jsdckj.ttarawa.history.dto.res.HistoryResDto;
import com.jsdckj.ttarawa.history.dto.res.MyHistoryResDto;
import com.jsdckj.ttarawa.history.entity.History;
import com.jsdckj.ttarawa.users.entity.Users;
import com.jsdckj.ttarawa.users.entity.UsersInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface HistoryService {

	// 게시물 저장
	void insertHistory(Long userId, HistoryReqDto.HistoryInfoDto historyInfoDto) throws IOException;

	// 게시물 1개 조회
	HistoryResDto selectOneHistory(Long userId, Long historyId);

	// 게시물 목록 조회
	List<HistoryResDto> selectAllHistory(Long userId, Pageable pageable);

	List<HistoryResDto> selectAllHistoryByRecommend(Long userId, int size, double lat, double lng);

	// 내 주행기록 목록 조회
	List<MyHistoryResDto> selectAllMyHistory(Long userId, Pageable pageable);

	// 게시물 수정
	boolean updateHistory(Long userId, Long historyId, HistoryUpdateReq historyUpdateReq);

	// 게시물 삭제
	void deleteHistory(Long userId, Long historyId);

	// Entity to HistoryResDto
	default HistoryResDto toHistoryResDto(History history, Users historyUser, UsersInfo historyUserInfo, int isMyFavorite, Long userId) {
		return HistoryResDto.builder()
				.historyId(history.getHistoryId())
				.userId(historyUser.getUsersId())
				.nickname(historyUser.getNickname())
				.profile(historyUser.getProfile())
				.badgeImg(historyUserInfo.getBadge().getImage())
				.favoritesCount(history.getFavoritesCount())
				.isMyFavorite(isMyFavorite)
				.time(history.getTime())
				.distance(history.getDistance())
				.image(history.getImage())
				.content(history.getContent())
				.startLat(history.getStartLat())
				.startLng(history.getStartLng())
				.endLat(history.getEndLat())
				.endLng(history.getEndLng())
				.isMyHistory(userId == history.getUsers().getUsersId() ? 1 : 0)
				.build();

	}


	// Entity to MyHistortResDto
	default MyHistoryResDto toMyHistoryResDto(History history, int isMyFavorite) {
		return MyHistoryResDto.builder()
				.historyId(history.getHistoryId())
				.isMyFavorite(isMyFavorite)
				.favoritesCount(history.getFavoritesCount())
				.personal(history.getPersonal())
				.time(history.getTime())
				.image(history.getImage())
				.distance(history.getDistance())
				.content(history.getContent())
				.build();

	}


	// HistoryReqDto to History Entity
	default History toEntity(Users currentUser, HistoryReqDto.HistoryInfoDto historyInfoDto, String url) {
		return History.builder()
				.time(historyInfoDto.getTime())
				.distance(historyInfoDto.getDistance())
				.content(historyInfoDto.getContent())
				.startLat(historyInfoDto.getStartLat())
				.startLng(historyInfoDto.getStartLng())
				.endLat(historyInfoDto.getEndLat())
				.endLng(historyInfoDto.getEndLng())
				.image(url)
				.usersId(currentUser.getUsersId())
				.build();
	}

}