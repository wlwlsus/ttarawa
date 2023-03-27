package com.jsdckj.ttarawa.history.repository;

import com.jsdckj.ttarawa.history.entity.History;
import com.jsdckj.ttarawa.users.entity.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {

	@Query("SELECT COUNT(h) FROM History h WHERE h.users.usersId = :userId")
	Long countByUserId(@Param("userId") long userId);

	Page<History> findAllByUsers(Users user, Pageable pageable);

	void deleteByHistoryId(Long historyId);
}
