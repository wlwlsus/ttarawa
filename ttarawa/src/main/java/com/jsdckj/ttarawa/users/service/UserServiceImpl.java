package com.jsdckj.ttarawa.users.service;


import com.jsdckj.ttarawa.jwt.JwtTokenProvider;
import com.jsdckj.ttarawa.users.dto.req.UserReqDto;
import com.jsdckj.ttarawa.users.dto.res.UserResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import java.util.Objects;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
  private final JwtTokenProvider jwtTokenProvider;
  private final RedisTemplate redisTemplate;



  @Override
  public boolean reissue(UserReqDto.Reissue reissue) {

    // 1. Refresh Token 검증
    if(!jwtTokenProvider.validateToken(reissue.getRefreshToken())){
      return false;
    }

    // 2. Access Token에서 정보 가져오기 <????
    Authentication authentication = jwtTokenProvider.getAuthentication(reissue.getAccessToken());

    //3. Redis 에서 User email 을 기반으로 저장된 Refresh Token 값을 가져온다
    String refreshToken = (String)redisTemplate.opsForValue().get("RT:"+authentication.getName());

    // 로그아웃 되어 Redis에 refresh token이 존재하지 않는 경우 처리
    if(ObjectUtils.isEmpty(refreshToken)) {
      return false;
    }
    if(!refreshToken.equals(reissue.getRefreshToken())) {
      return false;
    }

    // 4. 새로운 토큰 생성
    UserResDto.TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);

    redisTemplate.opsForValue()
        .set("RT:" + authentication.getName(), tokenInfo.getRefreshToken(), tokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);

    return true;
  }

  @Override
  public boolean logout(UserReqDto.Logout logout) {

    // 1. Access Token 검증
    if(!jwtTokenProvider.validateToken(logout.getAccessToken())){
      return false;
    }

    // 2. Access Token에서 user
    Authentication authentication = jwtTokenProvider.getAuthentication(logout.getAccessToken());
    if (redisTemplate.opsForValue().get("RT:" + authentication.getName()) != null) {
      // Refresh Token 삭제
      redisTemplate.delete("RT:" + authentication.getName());
    }

    // 4. 해당 Access Token 유효시간 가지고 와서 BlackList 로 저장하기
    Long expiration = jwtTokenProvider.getExpiration(logout.getAccessToken());
    redisTemplate.opsForValue()
        .set(logout.getAccessToken(), "logout", expiration, TimeUnit.MILLISECONDS);

    return true;
  }


}
