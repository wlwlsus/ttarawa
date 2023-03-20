package com.jsdckj.ttarawa.users.repository;

import com.jsdckj.ttarawa.users.entity.Badge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BadgeRepository extends JpaRepository<Badge, Long> {

  Badge findByName(String name);
  
}
