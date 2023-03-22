package com.jsdckj.ttarawa.jwt;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.Enumeration;

import static com.jsdckj.ttarawa.jwt.JwtProperties.TOKEN_HEADER;


@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilter {

  private final JwtTokenProvider jwtTokenProvider;
  private final RedisTemplate<String, String> redisTemplate;
  @Override
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

    System.out.println("jwtauthenticationfilter");
    // 1. Request Header에서 JWT 토큰 추출
    String token = resolveToken((HttpServletRequest) request);
    System.out.println(token);
    // 2. validateToken으로 토큰 유효성 검사
    if(token!=null && jwtTokenProvider.validateToken(token)){
      // Redis에 해당 accessToken logout 여부 확인
      String isLogout = (String)redisTemplate.opsForValue().get(token);
      if(ObjectUtils.isEmpty(isLogout)){
        // 토큰이 유효할 경우 토큰에서 Authentication 객체를 가지고 와서 SecurityContext에 저장
        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        SecurityContextHolder.getContext().setAuthentication(authentication);
      }
    }
    chain.doFilter(request,response);
  }

  // Request Header에서 토큰 정보 추출
  private String resolveToken(HttpServletRequest request){
    String token = request.getHeader(TOKEN_HEADER);

//    System.out.println("header token "+token);


    if(StringUtils.hasText(token) && token.startsWith("Bearer")){
      return token.substring(7);
    }
    return null;
  }
}
