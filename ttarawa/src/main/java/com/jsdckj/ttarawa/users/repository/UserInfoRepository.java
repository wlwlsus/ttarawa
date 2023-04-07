package com.jsdckj.ttarawa.users.repository;


import com.jsdckj.ttarawa.users.entity.Users;
import com.jsdckj.ttarawa.users.entity.UsersInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserInfoRepository extends JpaRepository<UsersInfo, Long> {

	Optional<UsersInfo> findUsersInfoByUsers_UsersId(Long userId);

	UsersInfo findByUsers(Users user);

}
