package com.jsdckj.ttarawa.history.controller;

import com.jsdckj.ttarawa.history.dto.req.HistoryReqDto;
import com.jsdckj.ttarawa.history.dto.req.HistoryUpdateReq;
import com.jsdckj.ttarawa.history.dto.res.HistoryResDto;
import com.jsdckj.ttarawa.history.service.FavoriteService;
import com.jsdckj.ttarawa.history.service.HistoryService;
import com.jsdckj.ttarawa.util.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/history/post")
@RequiredArgsConstructor
@Tag(name = "History", description = "주행기록 API")
public class HistoryController {

  private final HistoryService historyService;
  // post //

  // 게시물 저장
  @Operation(summary = "주행 기록 저장 API", description = "user_id: 사용자 user_id\n\n" +
      "image: Multipartfile => 아직 안됨 \n\n" +
      "personal: 1: 비공개, 0: 공개\n\n" +
      "time: 초 단위\n\n" +
      "distance: 미터 단위")
  @PostMapping("/{user_id}")
  public ResponseEntity<?> insertHistory(@PathVariable("user_id") Long userId, @RequestPart MultipartFile image, @RequestPart HistoryReqDto historyReqDto) throws IOException {
    historyService.insertHistory(userId, image, historyReqDto);
    return Response.ok("게시물 저장 성공");
  }

  // 게시물 1개 조회
  @Operation(summary = "게시물 1개 조회 API", description = "history_id: 주행 기록 게시물 번호\n\n" +
      "favoritesCount: 좋아요 개수\n\n" +
      "isMyFavorite: 1: 내가 좋아요를 누름, 0: 안누름\n\n" +
      "time: 초단위\n\n" +
      "distance: 미터단위\n\n" +
      "image: 게시물 이미지\n\n")
  @GetMapping("/detail/{history_id}")
  public ResponseEntity<?> selectOneHistory(@PathVariable("history_id") Long historyId) {
    Long userId = 38L; // 현재 유저 가져오기 -> jwt 복호화 하는 메소드 추가 해야함
    HistoryResDto historyResDto = historyService.selectOneHistory(userId, historyId);
    if (historyResDto != null) {
      return Response.makeResponse(HttpStatus.OK, "게시물 상세 조회 성공", historyResDto);
    } else {
      return Response.badRequest("게시물 없음");
    }
  }

  // 게시물 목록 조회
  @Operation(summary = "게시물 목록 조회 API", description="최신순: ~~?page=0&sort=createdDate,desc \\n" +
      "좋아요순: ~~?page=0&sort=favoritesCount,desc \n\n" +
      "추천순 미완 \n\n" +
      "swagger에서 요청시 \n\n" +
      "{\n\n" +
      "  \"page\": 0(0부터 시작),\n\n" +
      "  \"size\": 10,\n\n" +
      "  \"sort\": [ \n\n" +
      "    \"createdDate,desc 또는 favoritesCount,desc 중 하나\"\n" +
      "  ]\n\n" +
      "}")
  @GetMapping
  public ResponseEntity<?> selectAllHistory(Pageable pageable) {
    Long userId = 38L; // 현재 유저 가져오기 -> jwt 복호화 하는 메소드 추가 해야함
    return Response.makeResponse(HttpStatus.OK, "게시물 조회에 성공했습니다", historyService.selectAllHistory(userId, pageable));
  }

  // 내 주행기록 조회
  @Operation(summary = "내 주행 기록 목록 조회 API", description = "~~?page=0 -> 0부터 시작")
  @GetMapping("/{user_id}")
  public ResponseEntity<?> selectAllMyHistory(@PathVariable("user_id") Long userId, @PageableDefault(sort="createdDate",direction= Sort.Direction.DESC) Pageable pageable){

    return Response.makeResponse(HttpStatus.OK, "내 주행 기록 조회에 성공했습니다", historyService.selectAllMyHistory(userId, pageable));

  }


  // 게시물 수정
  @Operation(summary = "게시물 수정 API", description = "personal: 1: 비공개, 0: 공개")
  @PutMapping("/post/{user_id}")
  public ResponseEntity<?> updateHistory(@PathVariable("user_id") Long userId, @RequestParam("history_id") Long historyId, @RequestBody HistoryUpdateReq historyUpdateReq) {
    if (historyService.updateHistory(userId, historyId, historyUpdateReq))
      return Response.ok("게시물 수정 성공");
    else
      return Response.badRequest("게시물 수정 실패 - 사용자 불일치");
  }


  // 게시물 삭제
  @Operation(summary = "게시물 삭제 API")
  @DeleteMapping("/post/{user_id}")
  public ResponseEntity<?> deleteHistory(@PathVariable("user_id") Long userId, @RequestParam("history_id") Long historyId) {
    historyService.deleteHistory(userId, historyId);
    return Response.ok("게시물 삭제 성공");
  }


}