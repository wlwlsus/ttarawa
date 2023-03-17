package com.jsdckj.ttarawa.history.controller;

import com.jsdckj.ttarawa.history.dto.req.HistoryReqDto;
import com.jsdckj.ttarawa.history.dto.req.HistoryUpdateReq;
import com.jsdckj.ttarawa.history.service.HistoryService;
import com.jsdckj.ttarawa.util.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/history")
@RequiredArgsConstructor
public class HistoryController {

  private final HistoryService historyService;

  // 게시물 저장
  @PostMapping("/post/{user_id}")
  public ResponseEntity<?> insertHistory(@PathVariable("user_id") Long userId, @RequestPart MultipartFile image, @RequestPart HistoryReqDto historyReqDto){
    historyService.insertHistory(userId, image, historyReqDto);
    return Response.ok("게시물 저장 성공");
  }

  // 게시물 수정
  @PutMapping("/post/{user_id}")
  public ResponseEntity<?> updateHistory(@PathVariable("user_id") Long userId, @RequestParam("history_id") Long historyId, @RequestBody HistoryUpdateReq historyUpdateReq){
    historyService.updateHistory(userId, historyId, historyUpdateReq);
    return Response.ok("게시물 수정 성공");
  }

  // 게시물 삭제
  @DeleteMapping("/post/{user_id}")
  public ResponseEntity<?> deleteHistory(@PathVariable("user_id") Long userId, @RequestParam("history_id") Long historyId){
    historyService.deleteHistory(userId,historyId);
    return Response.ok("게시물 삭제 성공");
  }

}