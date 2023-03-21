package com.jsdckj.ttarawa.history.service;

import com.jsdckj.ttarawa.history.dto.req.HistoryReqDto;
import com.jsdckj.ttarawa.history.dto.req.HistoryUpdateReq;
import com.jsdckj.ttarawa.history.dto.res.HistoryResDto;
import com.jsdckj.ttarawa.history.dto.res.MyHistoryResDto;
import com.jsdckj.ttarawa.history.entity.History;
import com.jsdckj.ttarawa.users.entity.Users;
import com.jsdckj.ttarawa.users.entity.UsersInfo;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface HistoryService {

  // 게시물 저장
  void insertHistory(Long userId, MultipartFile img, HistoryReqDto historyReqDto) throws IOException;
  // 게시물 1개 조회
  HistoryResDto selectOneHistory(Long userId, Long historyId);
  // 게시물 목록 조회
  List<HistoryResDto> selectAllHistory(Long userId, Pageable pageable);
  // 내 주행기록 목록 조회
  List<MyHistoryResDto> selectAllMyHistory(Long userId, Pageable pageable);
  // 게시물 수정
  boolean updateHistory(Long userId, Long historyId, HistoryUpdateReq historyUpdateReq);
  // 게시물 삭제
  void deleteHistory(Long userId, Long historyId);

  // Entity to HistoryResDto
  default HistoryResDto toHistoryResDto(History history, Users historyUser, UsersInfo historyUserInfo, int isMyFavorite) {
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
        .startAddress(history.getStartAddress())
        .endAddress(history.getEndAddress())
        .build();

  }

  // Entity to MyHistortResDto
  default MyHistoryResDto toMyHistoryResDto(History history){
    return MyHistoryResDto.builder()
        .historyId(history.getHistoryId())
        .favoritesCount(history.getFavoritesCount())
        .personal(history.getPersonal())
        .time(history.getTime())
        .distance(history.getDistance())
        .content(history.getContent())
        .build();

  }


  // HistoryReqDto to History Entity
  default History toEntity(Users currentUser, HistoryReqDto historyReqDto, String url){
    return History.builder()
        .time(historyReqDto.getTime())
        .distance(historyReqDto.getDistance())
        .content(historyReqDto.getContent())
        .startAddress(historyReqDto.getStartAddress())
        .endAddress(historyReqDto.getEndAddress())
        .image(url)
        .users(currentUser)
        .build();
  }

}