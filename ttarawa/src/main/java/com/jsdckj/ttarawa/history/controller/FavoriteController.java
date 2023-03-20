package com.jsdckj.ttarawa.history.controller;

import com.jsdckj.ttarawa.history.service.FavoriteService;
import com.jsdckj.ttarawa.util.Response;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/history/favorite")
@RequiredArgsConstructor
@Tag(name = "Favorite", description = "좋아요 API")
public class FavoriteController {

  private final FavoriteService favoriteService;


  // 좋아요 등록
  @PostMapping("/{user_id}")
  public ResponseEntity<?> addFavorite(@PathVariable("user_id") Long userId, @RequestParam("history_id") Long historyId) {
    boolean isSuccess = favoriteService.addFavorite(userId, historyId);
    if (isSuccess) {
      return Response.ok("좋아요 등록 성공");
    } else {
      return Response.badRequest("좋아요 등록 실패");
    }
  }

  // 좋아요한 게시글 목록 조회
  @GetMapping("/{user_id}")
  public ResponseEntity<?> selectAllFavoriteHistory(@PathVariable("user_id") Long userId, Pageable pageable) {
    return Response.makeResponse(HttpStatus.OK, "좋아요 한 게시글 목록 조회에 성공했습니다", favoriteService.selectAllFavoriteHistory(userId, pageable));
  }


  // 좋아요 삭제
  @DeleteMapping("/{user_id}")
  public ResponseEntity<?> deleteFavorite(@PathVariable("user_id") Long userId, @RequestParam("history_id") Long historyId) {
    boolean isSuccess = favoriteService.deleteFavorite(userId, historyId);
    if (isSuccess) {
      return Response.ok("좋아요 제거 성공");
    } else {
      return Response.badRequest("좋아요 삭제 실패");
    }
  }

}
