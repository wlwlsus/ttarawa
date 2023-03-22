package com.jsdckj.ttarawa.users.controller;


import com.jsdckj.ttarawa.jwt.JwtUtil;
import com.jsdckj.ttarawa.users.dto.req.UserNicknameReqDto;
import com.jsdckj.ttarawa.users.dto.req.UserReqDto;
import com.jsdckj.ttarawa.users.dto.res.UserInfoResDto;
import com.jsdckj.ttarawa.users.service.UserService;
import com.jsdckj.ttarawa.util.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static com.jsdckj.ttarawa.jwt.JwtProperties.TOKEN_HEADER;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@Tag(name = "User", description = "User API")
public class UserController {

  //  private final JwtUtil jwtUtil;
  private final UserService userService;
  private final JwtUtil jwtUtil;


  @Operation(summary = "토큰 재발급 API")
  @PostMapping("/token")
  public ResponseEntity<?> reissue(@RequestBody UserReqDto.Reissue reissue, Errors errors) {

    if (errors.hasErrors()) {
      return Response.badRequest("토큰 재발급 실패");
    }

    return userService.reissue(reissue);

  }

  @Operation(summary = "로그아웃 API")
  @PostMapping("/logout")
  public ResponseEntity<?> logout(@RequestBody UserReqDto.Logout logout, Errors errors) {
    if (errors.hasErrors()) {
      return Response.badRequest("로그아웃 실패");
    }

    return userService.logout(logout);
  }

  @Operation(summary = "회원 정보 API")
  @GetMapping("/{user_id}")
  public ResponseEntity<?> getUserInfo(HttpServletRequest request, @PathVariable("user_id") Long userId) {
    Long headerUserId = jwtUtil.getUserId(request.getHeader(TOKEN_HEADER));
    if (userId != headerUserId) {
      return Response.badRequest("사용자 불일치");
    }

    UserInfoResDto userInfoResDto = userService.getUserInfo(userId);

    return Response.makeResponse(HttpStatus.OK, "회원 정보 조회 성공", userInfoResDto);
  }


  @Operation(summary = "닉네임 변경 API")
  @PutMapping("/nickname/{user_id}")
  public ResponseEntity<?> updateUserNickname(HttpServletRequest request, @PathVariable("user_id") Long userId, @RequestBody UserNicknameReqDto userNicknameReqDto) {
    Long headerUserId = jwtUtil.getUserId(request.getHeader(TOKEN_HEADER));

    if (userId != headerUserId) {
      return Response.badRequest("사용자 불일치");
    }
    userService.updateNickname(userId, userNicknameReqDto.getNickname());
    return Response.ok("닉네임 변경 성공");
  }

  @Operation(summary = "프로필 사진 변경 API")
  @PutMapping(value = "/profile/{user_id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<?> updateProfile(HttpServletRequest request, @PathVariable("user_id") Long userId, @RequestPart("image") MultipartFile multipartFile) throws IOException {
//    Long headerUserId =jwtUtil.getUserId(request.getHeader(TOKEN_HEADER));
//
//    if(userId!=headerUserId){
//      return Response.badRequest("사용자 불일치");
//    }
    userService.updateProfile(userId, multipartFile);
    return Response.ok("프로필 사진 변경 성공");
  }

  @Operation(summary = "프로필 사진 샥제 API")
  @DeleteMapping("/profile/{user_id}")
  public ResponseEntity<?> deleteProfile(HttpServletRequest request, @PathVariable("user_id") Long userId) {
//    Long headerUserId =jwtUtil.getUserId(request.getHeader(TOKEN_HEADER));
//
//    if(userId!=headerUserId){
//      return Response.badRequest("사용자 불일치");
//    }

    userService.deleteProfile(userId);
    return Response.ok("프로필 사진 삭제 성공");
  }


}
