package com.jsdckj.ttarawa.users.repository;

import com.jsdckj.ttarawa.users.entity.Users;
import com.jsdckj.ttarawa.users.entity.UsersInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserInfoRepository extends JpaRepository<UsersInfo, Long> {

    UsersInfo findByUsers(Users user);

}
