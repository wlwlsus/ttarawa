package com.jsdckj.ttarawa.history.service;


import com.jsdckj.ttarawa.history.entity.Favorites;
import com.jsdckj.ttarawa.history.entity.History;
import com.jsdckj.ttarawa.history.repository.FavoriteRepository;
import com.jsdckj.ttarawa.history.repository.HistoryRepository;
import com.jsdckj.ttarawa.users.entity.Users;
import com.jsdckj.ttarawa.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class FavoriteServiceImpl implements FavoriteService {

  private final FavoriteRepository favoriteRepository;
  private final UserRepository userRepository;
  private final HistoryRepository historyRepositoy;

  @Override
  public List<Favorites> selectAllFavorites(Long userId) {


    return null;
  }

  @Override
  public void insertFavorite(Long userId, Long historyId) {

    Users currentUser = userRepository.findById(userId).get(); // 현재 유저
    History favoriteHistory = historyRepositoy.findById(historyId).get(); // 좋아요 누른 게시물

    // favorite 테이블에 저장
    favoriteRepository.save(Favorites.builder().
        users(currentUser)
        .history(favoriteHistory)
        .build());

    // 그 게시물의 favorites_count 1 늘리기
    favoriteHistory.plusFavoritesCount();
  }

  @Override
  public void deleteFavorite(Long userId, Long historyId) {

    Users currentUser = userRepository.findById(userId).get(); // 현재 유저
    History favoriteHistory = historyRepositoy.findById(historyId).get(); // 좋아요 삭제할 게시물

    // favorites 테이블에서 찾기
    Favorites favorite = favoriteRepository.findByUsersAndHistory(currentUser, favoriteHistory);

    favoriteRepository.deleteById(favorite.getFavoritesId()); // 삭제하기

    // 그 게시물의 favorites_count 1 감소하기
    favoriteHistory.minusFavoritesCount();
  }
}
