package com.jsdckj.ttarawa.history.repository;

import com.jsdckj.ttarawa.history.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {

    void deleteByHistoryId(Long historyId);
}
