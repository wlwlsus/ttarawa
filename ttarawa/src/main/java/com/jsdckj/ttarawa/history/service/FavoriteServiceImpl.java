package com.jsdckj.ttarawa.history.service;


import com.jsdckj.ttarawa.history.dto.res.FavoriteResDto;
import com.jsdckj.ttarawa.history.dto.res.HistoryResDto;
import com.jsdckj.ttarawa.history.entity.Favorites;
import com.jsdckj.ttarawa.history.entity.History;
import com.jsdckj.ttarawa.history.repository.FavoriteRepository;
import com.jsdckj.ttarawa.history.repository.HistoryRepository;
import com.jsdckj.ttarawa.users.dto.res.UserResDto;
import com.jsdckj.ttarawa.users.entity.Users;
import com.jsdckj.ttarawa.users.entity.UsersInfo;
import com.jsdckj.ttarawa.users.repository.UserInfoRepository;
import com.jsdckj.ttarawa.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

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

//    for(Favorites favorites : favoritesList){
//
//      Users historyUser = userRepository.findById(favorites.getUsers().getUsersId()).get();
//      History history = historyRepository.findById(favorites.getHistory().getHistoryId()).get();
//      UsersInfo historyUserInfo = userInfoRepository.findById(historyUser.getUsersId()).get();
//
//      favoriteHistoryList.add(HistoryResDto.builder()
//          .historyId(history.getHistoryId())
//          .nickname(historyUser.getNickname())
//          .profile(historyUser.getProfile())
//          .badgeName(historyUserInfo.getBadge().getName())
//          .favoritesCount(history.getFavoritesCount())
//          .isMyFavorite(1)
//          .time(history.getTime())
//          .distance(history.getDistance())
//          .image(history.getImage())
//          .content(history.getContent())
//          .startAddress(history.getStartAddress())
//          .endAddress(history.getEndAddress())
//          .build());
//
//    }    for(Favorites favorites : favoritesList){
//
//      Users historyUser = userRepository.findById(favorites.getUsers().getUsersId()).get();
//      History history = historyRepository.findById(favorites.getHistory().getHistoryId()).get();
//      UsersInfo historyUserInfo = userInfoRepository.findById(historyUser.getUsersId()).get();
//
//      favoriteHistoryList.add(HistoryResDto.builder()
//          .historyId(history.getHistoryId())
//          .nickname(historyUser.getNickname())
//          .profile(historyUser.getProfile())
//          .badgeName(historyUserInfo.getBadge().getName())
//          .favoritesCount(history.getFavoritesCount())
//          .isMyFavorite(1)
//          .time(history.getTime())
//          .distance(history.getDistance())
//          .image(history.getImage())
//          .content(history.getContent())
//          .startAddress(history.getStartAddress())
//          .endAddress(history.getEndAddress())
//          .build());
//
//    }

    for (Favorites favorites : favoritesList) {

      Users historyUser = userRepository.findById(favorites.getUsers().getUsersId()).get();
      History history = historyRepository.findById(favorites.getHistory().getHistoryId()).get();

      favoriteHistoryList.add(
          FavoriteResDto.builder()
              .favoritesId(favorites.getFavoritesId())
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

  @Override
  public void addFavorite(Long userId, Long historyId) {

    Users currentUser = userRepository.findById(userId).get(); // 현재 유저
    History favoriteHistory = historyRepository.findById(historyId).get(); // 좋아요 누른 게시물

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
    History favoriteHistory = historyRepository.findById(historyId).get(); // 좋아요 삭제할 게시물

    // favorites 테이블에서 찾기
    Favorites favorite = favoriteRepository.findByUsersAndHistory(currentUser, favoriteHistory);

    favoriteRepository.deleteById(favorite.getFavoritesId()); // 삭제하기

    // 그 게시물의 favorites_count 1 감소하기
    favoriteHistory.minusFavoritesCount();
  }
}
