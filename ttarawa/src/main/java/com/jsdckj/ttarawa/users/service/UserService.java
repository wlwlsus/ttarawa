package com.jsdckj.ttarawa.users.service;

import com.jsdckj.ttarawa.jwt.JwtTokenProvider;
import com.jsdckj.ttarawa.users.dto.req.UserReqDto;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;

public interface UserService {


  // 토큰 재발급
  boolean reissue(UserReqDto.Reissue reissue);
  boolean logout(UserReqDto.Logout logout);


}
