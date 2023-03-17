package com.jsdckj.ttarawa.users.repository;

import com.jsdckj.ttarawa.users.entity.UsersInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInfoRepository extends JpaRepository<UsersInfo, Long> {
}
