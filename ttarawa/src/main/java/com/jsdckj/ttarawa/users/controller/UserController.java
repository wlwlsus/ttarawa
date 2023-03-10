package com.jsdckj.ttarawa.users.controller;


import com.jsdckj.ttarawa.jwt.JwtUtil;
import com.jsdckj.ttarawa.users.dto.req.UserReqDto;
import com.jsdckj.ttarawa.users.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

  private final JwtUtil jwtUtil;
  private final UserService userService;

  @PostMapping("user/token")
  public ResponseEntity<?> reissue(HttpServletRequest request, UserReqDto.Reissue reissue){

    userService.reissue(reissue);


    return null;

  }

  @PostMapping("user/logout")
  public ResponseEntity<?> logout(HttpServletRequest request, UserReqDto.Logout logout){
    userService.logout(logout);
    return null;
  }

}
