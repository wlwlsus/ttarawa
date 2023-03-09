package com.jsdckj.ttarawa.users.repository;

import com.jsdckj.ttarawa.users.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {

  Optional<Users> findByEmailAndProvider(String email, String provider);

}
