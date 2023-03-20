package com.jsdckj.ttarawa.history.service;


import com.jsdckj.ttarawa.history.dto.res.FavoriteResDto;
import com.jsdckj.ttarawa.history.entity.Favorites;
import com.jsdckj.ttarawa.history.entity.History;
import com.jsdckj.ttarawa.history.repository.FavoriteRepository;
import com.jsdckj.ttarawa.history.repository.HistoryRepository;
import com.jsdckj.ttarawa.users.entity.Users;
import com.jsdckj.ttarawa.users.repository.UserInfoRepository;
import com.jsdckj.ttarawa.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class FavoriteServiceImpl implements FavoriteService {

  private final FavoriteRepository favoriteRepository;
  private final UserRepository userRepository;
  private final HistoryRepository historyRepository;
  private final UserInfoRepository userInfoRepository;

  // 내가 좋아요 누른 게시물 목록
  @Override
  public List<FavoriteResDto> selectAllFavoriteHistory(Long userId) {

    Users currentUser = userRepository.findById(userId).get(); // 현재 유저
    List<Favorites> favoritesList = favoriteRepository.findByUsers(currentUser); // 내가 누른 좋아요 게시물 번호 찾기ㅌ

    List<FavoriteResDto> favoriteHistoryList = new ArrayList<>();

    for (Favorites favorites : favoritesList) {

      Users historyUser = userRepository.findById(favorites.getUsers().getUsersId()).get();
      History history = historyRepository.findById(favorites.getHistory().getHistoryId()).get();

      favoriteHistoryList.add(
          FavoriteResDto.builder()
              .favoritesId(favorites.getFavoritesId())
              .historyId(favorites.getHistory().getHistoryId())
              .nickname(historyUser.getNickname())
              .image(history.getImage())
              .distance(history.getDistance())
              .time(history.getTime())
              .startAddress(history.getStartAddress())
              .endAddress(history.getEndAddress())
              .build());

    }


    return favoriteHistoryList;
  }

  // 좋아요 등록
  @Override
  public boolean addFavorite(Long userId, Long historyId) {

    Users currentUser = userRepository.findById(userId).get(); // 현재 유저
    Optional<History> favoriteHistory = historyRepository.findById(historyId); // 좋아요 누른 게시물

    if (favoriteHistory.isPresent()) {
      // favorite 테이블에 저장
      favoriteRepository.save(Favorites.builder().
          users(currentUser)
          .history(favoriteHistory.get())
          .build());

      // 그 게시물의 favorites_count 1 늘리기
      favoriteHistory.get().plusFavoritesCount();
      return true;
    } else {
      return false;
    }


  }

  
  // 좋아요 삭제
  @Override
  public boolean deleteFavorite(Long userId, Long historyId) {

    Users currentUser = userRepository.findById(userId).get(); // 현재 유저
    History favoriteHistory = historyRepository.findById(historyId).get(); // 좋아요 삭제할 게시물

    // favorites 테이블에서 찾기
    Optional<Favorites> favorite = favoriteRepository.findByUsersAndHistory(currentUser, favoriteHistory);

    if (favorite.isPresent()) {
      favoriteRepository.deleteById(favorite.get().getFavoritesId()); // 삭제하기
      // 그 게시물의 favorites_count 1 감소하기
      favoriteHistory.minusFavoritesCount();
      return true;
    } else {
      return false;
    }

  }
}
