package com.jsdckj.ttarawa.history.repository;

import com.jsdckj.ttarawa.history.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface HistoryRepository extends JpaRepository<History, Long> {

  @Query("SELECT COUNT(h) FROM History h WHERE h.users.usersId = :userId")
  Long countByUserId(@Param("userId") long userId);
}
