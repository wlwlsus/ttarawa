package com.jsdckj.ttarawa.users.repository;

import com.jsdckj.ttarawa.users.entity.Badge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BadgeRepository extends JpaRepository<Badge, Long> {
  Badge findByName(String name);
}
