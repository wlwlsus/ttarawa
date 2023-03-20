package com.jsdckj.ttarawa.history.service;

import com.jsdckj.ttarawa.history.dto.req.HistoryReqDto;
import com.jsdckj.ttarawa.history.dto.req.HistoryUpdateReq;
import com.jsdckj.ttarawa.history.dto.res.HistoryResDto;
import com.jsdckj.ttarawa.history.entity.History;
import com.jsdckj.ttarawa.users.entity.Users;
import com.jsdckj.ttarawa.users.entity.UsersInfo;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface HistoryService {

  // 게시물 저장
  void insertHistory(Long userId, MultipartFile img, HistoryReqDto historyReqDto);

  HistoryResDto selectOneHistory(Long userId, Long historyId);

  //  List<HistoryResDto> selectAllHistory(Long userId, String sortBy, int page);
  List<HistoryResDto> selectAllHistory(Long userId, Pageable pageable);

  List<HistoryResDto> selectAllMyHistory(Long userId);

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

  // HistoryReqDto to History Entity
  default History toEntity(Users currentUser, HistoryReqDto historyReqDto){
    return History.builder()
        .time(historyReqDto.getTime())
        .distance(historyReqDto.getDistance())
        .content(historyReqDto.getContent())
        .startAddress(historyReqDto.getStartAddress())
        .endAddress(historyReqDto.getEndAddress())
        .image("")
        .users(currentUser)
        .build();
  }

}