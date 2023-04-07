package com.jsdckj.ttarawa.history.repository;

import com.jsdckj.ttarawa.history.entity.Favorites;
import com.jsdckj.ttarawa.history.entity.History;
import com.jsdckj.ttarawa.users.entity.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorites, Long> {

  // 유저 한 명의 좋아요 목록
  Page<Favorites> findByUsers(Users user, Pageable pageable);

  // userid, historyid로 유저가 누른 좋아요 찾기
  Optional<Favorites> findByUsersAndHistory(Users user, History history);


}
