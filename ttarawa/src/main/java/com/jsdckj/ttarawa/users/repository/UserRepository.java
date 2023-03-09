package com.jsdckj.ttarawa.users.repository;

import com.jsdckj.ttarawa.users.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, Long> {
}
