package com.jsdckj.ttarawa.users.repository;

import com.jsdckj.ttarawa.oauth.entity.ProviderType;
import com.jsdckj.ttarawa.users.entity.Users;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {

  Users findByEmailAndProvider(String email, ProviderType provider);
  Users findByNickname(String nickname);

}
