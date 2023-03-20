package com.jsdckj.ttarawa.history.repository;

import com.jsdckj.ttarawa.history.entity.History;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {

//  Page<History> findAll(Pageable pageable);
  void deleteByHistoryId(Long historyId);
}
