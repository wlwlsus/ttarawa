package com.jsdckj.ttarawa.history.repository;

import com.jsdckj.ttarawa.history.entity.History;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface HistoryRepository extends JpaRepository<History, Long> {

  @Query("SELECT COUNT(h) FROM History h WHERE h.users.usersId = :userId")
  Long countByUserId(@Param("userId") long userId);
}
