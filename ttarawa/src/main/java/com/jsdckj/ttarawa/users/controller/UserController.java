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
  @GetMapping
  public ResponseEntity<?> getUserInfo(HttpServletRequest request) {
    Long userId = jwtUtil.getUserId(request.getHeader(TOKEN_HEADER));

    UserInfoResDto userInfoResDto = userService.getUserInfo(userId);

    return Response.makeResponse(HttpStatus.OK, "회원 정보 조회 성공", userInfoResDto);
  }


  @Operation(summary = "닉네임 변경 API")
  @PutMapping("/nickname")
  public ResponseEntity<?> updateUserNickname(HttpServletRequest request, @RequestBody UserNicknameReqDto userNicknameReqDto) {
    Long userId = jwtUtil.getUserId(request.getHeader(TOKEN_HEADER));

    userService.updateNickname(userId, userNicknameReqDto.getNickname());
    return Response.ok("닉네임 변경 성공");
  }

  @Operation(summary = "프로필 사진 변경 API", description = "사진 파일로 전송  -> multipart/form-data")
  @PutMapping(value = "/profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<?> updateProfile(HttpServletRequest request,@RequestPart("image") MultipartFile multipartFile) throws IOException {
    Long userId = jwtUtil.getUserId(request.getHeader(TOKEN_HEADER));

    userService.updateProfile(userId, multipartFile);
    return Response.ok("프로필 사진 변경 성공");
  }

  @Operation(summary = "프로필 사진 삭제 API")
  @DeleteMapping("/profile")
  public ResponseEntity<?> deleteProfile(HttpServletRequest request) {

    Long userId = jwtUtil.getUserId(request.getHeader(TOKEN_HEADER));

    userService.deleteProfile(userId);
    return Response.ok("프로필 사진 삭제 성공");
  }


}
