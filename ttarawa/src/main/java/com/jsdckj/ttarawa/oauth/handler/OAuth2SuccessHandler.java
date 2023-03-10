package com.jsdckj.ttarawa.oauth.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jsdckj.ttarawa.jwt.JwtTokenProvider;
import com.jsdckj.ttarawa.users.dto.res.UserResDto;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.concurrent.TimeUnit;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

  private final JwtTokenProvider tokenProvider;
  private final RedisTemplate redisTemplate;
  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {

    if (response.isCommitted()) {
      logger.info("Response has already been committed. Unable to redirect to ");
      return;
    }

    System.out.println("success handler");

    clearAuthenticationAttributes(request);
    UserResDto.TokenInfo tokenInfo = tokenProvider.generateToken(authentication);

    // refresh token Redis 저장 (expirationTime 설정 통해 자동 삭제 처리)
    redisTemplate.opsForValue()
        .set("Refresh Token: "+authentication.getName(),tokenInfo.getRefreshToken(),tokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);

    ObjectMapper om = new ObjectMapper();
    String jsonStr = null;


    try (PrintWriter writer = response.getWriter();){
      jsonStr = om.writeValueAsString(tokenInfo);
      writer.print(jsonStr);
    } catch (JsonProcessingException e) {
      logger.error("Failed to generate token JSON", e);
    }


  }
}
