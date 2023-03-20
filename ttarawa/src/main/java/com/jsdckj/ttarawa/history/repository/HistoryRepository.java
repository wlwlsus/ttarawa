package com.jsdckj.ttarawa.history.repository;

import com.jsdckj.ttarawa.history.entity.History;
import com.jsdckj.ttarawa.users.entity.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {

  Page<History> findAllByUsers(Users user, Pageable pageable);

  void deleteByHistoryId(Long historyId);
}
