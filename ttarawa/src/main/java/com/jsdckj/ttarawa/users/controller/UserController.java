package com.jsdckj.ttarawa.users.controller;


//import com.jsdckj.ttarawa.jwt.JwtUtil;
import com.jsdckj.ttarawa.users.dto.req.UserNicknameReqDto;
import com.jsdckj.ttarawa.users.dto.req.UserReqDto;
import com.jsdckj.ttarawa.users.dto.res.UserInfoResDto;
import com.jsdckj.ttarawa.users.service.UserService;
import com.jsdckj.ttarawa.util.Response;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

//  private final JwtUtil jwtUtil;
  private final UserService userService;


  @PutMapping("/nickname/{user_id}")
  public ResponseEntity<?> updateUserNickname(@PathVariable("user_id")Long userId, @RequestBody UserNicknameReqDto userNicknameReqDto){
    userService.updateNickname(userId, userNicknameReqDto.getNickname());
    return Response.ok("닉네임 변경 성공");
  }

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
      return Response.badRequest("로그아웃 실패");
    }
    
    if(userService.logout(logout)){
      return Response.ok("로그아웃 성공");
    }
    else
      return Response.badRequest("로그아웃 실패");
  }

  @GetMapping("/{user_id}")
  public ResponseEntity<?> getUserInfo(@PathVariable("user_id") Long userId){

    UserInfoResDto userInfoResDto = userService.getUserInfo(userId);

    return Response.makeResponse(HttpStatus.OK, "회원 정보 조회 성공",userInfoResDto);
  }


}
