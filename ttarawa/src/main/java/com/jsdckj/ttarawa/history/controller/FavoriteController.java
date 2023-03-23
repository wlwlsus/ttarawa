package com.jsdckj.ttarawa.history.controller;

import com.jsdckj.ttarawa.history.service.FavoriteService;
import com.jsdckj.ttarawa.jwt.JwtUtil;
import com.jsdckj.ttarawa.util.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.jsdckj.ttarawa.jwt.JwtProperties.TOKEN_HEADER;

@RestController
@RequestMapping("/api/v1/history/favorite")
@RequiredArgsConstructor
@Tag(name = "Favorite", description = "좋아요 API")
public class FavoriteController {

  private final FavoriteService favoriteService;
  private final JwtUtil jwtUtil;


  // 좋아요 등록
  @Operation(summary = "좋아요 등록 API")
  @PostMapping
  public ResponseEntity<?> addFavorite(HttpServletRequest request, @RequestParam("history_id") Long historyId) {
    Long userId = jwtUtil.getUserId(request.getHeader(TOKEN_HEADER));
    boolean isSuccess = favoriteService.addFavorite(userId, historyId);
    if (isSuccess) {
      return Response.ok("좋아요 등록 성공");
    } else {
      return Response.badRequest("좋아요 등록 실패");
    }
  }

  // 좋아요한 게시글 목록 조회
  @Operation(summary = "좋아요 목록 조회 API", description = "~~?page=0 (0부터 시작),\n\n" +
      "swagger에서 test시 sort는 sort:[] 상태로 요청해야 함")
  @GetMapping
  public ResponseEntity<?> selectAllFavoriteHistory(HttpServletRequest request, Pageable pageable) {
    Long userId = jwtUtil.getUserId(request.getHeader(TOKEN_HEADER));

    return Response.makeResponse(HttpStatus.OK, "좋아요 한 게시글 목록 조회에 성공했습니다", favoriteService.selectAllFavoriteHistory(userId, pageable));
  }


  // 좋아요 삭제
  @Operation(summary = "좋아요 삭제 API")
  @DeleteMapping
  public ResponseEntity<?> deleteFavorite(HttpServletRequest request, @RequestParam("history_id") Long historyId) {

    Long userId = jwtUtil.getUserId(request.getHeader(TOKEN_HEADER));

    boolean isSuccess = favoriteService.deleteFavorite(userId, historyId);
    if (isSuccess) {
      return Response.ok("좋아요 제거 성공");
    } else {
      return Response.badRequest("좋아요 삭제 실패");
    }
  }

}
