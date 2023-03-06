package com.jsdckj.ttarawa.jwt;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.util.StringUtils;

import java.io.IOException;

import static com.jsdckj.ttarawa.jwt.JwtProperties.TOKEN_HEADER;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilter {

  @Override
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
    String token = resolveToken((HttpServletRequest) request);
//    if(token!=null &&.val)
  }

  private String resolveToken(HttpServletRequest request){
    String token = request.getHeader(TOKEN_HEADER);
    if(StringUtils.hasText(token) && token.startsWith("Bearer")){
      return token.substring(7);
    }
    return null;
  }
}
