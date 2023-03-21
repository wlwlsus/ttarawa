package com.jsdckj.ttarawa.users.service;

import com.jsdckj.ttarawa.jwt.JwtTokenProvider;
import com.jsdckj.ttarawa.users.dto.req.UserReqDto;
import com.jsdckj.ttarawa.users.dto.res.UserInfoResDto;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserService {


  // 토큰 재발급
  boolean reissue(UserReqDto.Reissue reissue);
  boolean logout(UserReqDto.Logout logout);

  UserInfoResDto getUserInfo(Long userId);
  void updateNickname(Long userId, String nickname);
  void updateProfile(Long userId, MultipartFile multipartFile) throws IOException;


}
