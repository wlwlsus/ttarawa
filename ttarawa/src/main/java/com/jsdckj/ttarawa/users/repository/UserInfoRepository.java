package com.jsdckj.ttarawa.users.repository;

import com.jsdckj.ttarawa.users.entity.UsersInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserInfoRepository extends JpaRepository<UsersInfo, Long> {


  Optional<UsersInfo> findUsersInfoByUsers_UsersId(Long userId);
}
