package com.jsdckj.ttarawa.history.service;

import com.jsdckj.ttarawa.history.dto.res.FavoriteResDto;
import com.jsdckj.ttarawa.history.dto.res.HistoryResDto;
import com.jsdckj.ttarawa.history.entity.Favorites;
import com.jsdckj.ttarawa.history.entity.History;
import com.jsdckj.ttarawa.users.entity.Users;
import com.jsdckj.ttarawa.users.entity.UsersInfo;

import java.util.List;

public interface FavoriteService {
  
  // 내가 좋아요한 게시글 목록 조회
  List<FavoriteResDto> selectAllFavoriteHistory(Long userId);
  
  // 주행 기록 게시물 좋아요 등록
  boolean addFavorite(Long userId, Long historyId);

  // 주행 기록 게시물 좋아요 제거
  boolean deleteFavorite(Long userId, Long historyId);

}
