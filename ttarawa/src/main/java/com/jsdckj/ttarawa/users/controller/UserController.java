package com.jsdckj.ttarawa.users.controller;


//import com.jsdckj.ttarawa.jwt.JwtUtil;
import com.jsdckj.ttarawa.users.dto.req.UserReqDto;
import com.jsdckj.ttarawa.users.service.UserService;
import com.jsdckj.ttarawa.util.Response;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

//  private final JwtUtil jwtUtil;
  private final UserService userService;

  @PostMapping("/token")
  public ResponseEntity<?> reissue(@RequestBody UserReqDto.Reissue reissue, Errors errors){

    if(errors.hasErrors()){
      return Response.badRequest("토큰 재발급 실패");
    }

    if(userService.reissue(reissue))
      return Response.ok("토큰 재발급 성공");
    else
      return Response.badRequest("토큰 재발급 실패");

  }

  @PostMapping("/logout")
  public ResponseEntity<?> logout(@RequestBody UserReqDto.Logout logout, Errors errors){
    if(errors.hasErrors()){
      return Response.badRequest("로그아웃c 실패");
    }
    
    if(userService.logout(logout)){
      return Response.ok("로그아웃 성공");
    }
    else
      return Response.badRequest("로그아웃 실패");
  }

}
