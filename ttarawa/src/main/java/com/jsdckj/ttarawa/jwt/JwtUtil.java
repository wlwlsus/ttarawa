package com.jsdckj.ttarawa.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;


public class JwtUtil {

  @Value("${jwt.secret}")
  private String secretKey;

  public Long getUserId(String token){
    token = token.replace(JwtProperties.BEARER_TYPE,"");
    Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);

    return claims.getBody().get("userId",Long.class);
  }



}
