package com.jsdckj.ttarawa.history.repository;

import com.jsdckj.ttarawa.history.entity.History;
import com.jsdckj.ttarawa.users.entity.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {

  Page<History> findAllByUsers(Users user, Pageable pageable);

  List<History> findAllByUsers(Users user);
  @Query("SELECT e FROM History e WHERE e.users <> :value")
  List<History> findAllByUsersNotEqual(@Param("value") Users users);

//  List<History> findAllByUsersNotE

  void deleteByHistoryId(Long historyId);
}
