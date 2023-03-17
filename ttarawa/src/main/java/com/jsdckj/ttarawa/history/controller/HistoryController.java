package com.jsdckj.ttarawa.history.controller;

import com.jsdckj.ttarawa.history.dto.req.HistoryReqDto;
import com.jsdckj.ttarawa.history.dto.req.HistoryUpdateReq;
import com.jsdckj.ttarawa.history.service.FavoriteService;
import com.jsdckj.ttarawa.history.service.HistoryService;
import com.jsdckj.ttarawa.util.Response;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/history")
@RequiredArgsConstructor
@Tag(name = "History", description = "주행기록 API, 좋아요 API")

public class HistoryController {

  private final HistoryService historyService;
  private final FavoriteService favoriteService;

  // post //

  // 게시물 저장
  @PostMapping("/post/{user_id}")
  public ResponseEntity<?> insertHistory(@PathVariable("user_id") Long userId, @RequestPart MultipartFile image, @RequestPart HistoryReqDto historyReqDto){
    historyService.insertHistory(userId, image, historyReqDto);
    return Response.ok("게시물 저장 성공");
  }

  // 게시물 수정
  @PutMapping("/post/{user_id}")
  public ResponseEntity<?> updateHistory(@PathVariable("user_id") Long userId, @RequestParam("history_id") Long historyId, @RequestBody HistoryUpdateReq historyUpdateReq){
    if(historyService.updateHistory(userId, historyId, historyUpdateReq))
      return Response.ok("게시물 수정 성공");
    else
      return Response.badRequest("게시물 수정 실패 - 사용자 불일치");
  }


  // 게시물 삭제
  @DeleteMapping("/post/{user_id}")
  public ResponseEntity<?> deleteHistory(@PathVariable("user_id") Long userId, @RequestParam("history_id") Long historyId){
    historyService.deleteHistory(userId,historyId);
    return Response.ok("게시물 삭제 성공");
  }

  // favorite //


  // 좋아요 등록
  @PostMapping("/favorite/{user_id}")
  public ResponseEntity<?> addFavorite(@PathVariable("user_id") Long userId, @RequestParam("history_id") Long historyId){
    favoriteService.addFavorite(userId, historyId);
    return Response.ok("좋아요 등록 성공");
  }

  // 좋아요한 게시글 목록 조회
  @GetMapping("/favorite/{user_id}")
  public ResponseEntity<?> selectAllFavoriteHistory(@PathVariable("user_id") Long userId){
    return Response.makeResponse(HttpStatus.OK,"좋아요 한 게시글 목록 조회에 성공했습니다", favoriteService.selectAllFavoriteHistory(userId) );
  }



  // 좋아요 삭제
  @DeleteMapping("/favorite/{user_id}")
  public ResponseEntity<?> deleteFavorite(@PathVariable("user_id") Long userId, @RequestParam("history_id") Long historyId){
    favoriteService.deleteFavorite(userId, historyId);
    return Response.ok("좋아요 제거 성공");
  }

}