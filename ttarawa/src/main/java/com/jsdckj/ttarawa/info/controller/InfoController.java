package com.jsdckj.ttarawa.info.controller;


import com.jsdckj.ttarawa.info.service.InfoService;
import com.jsdckj.ttarawa.util.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/info")
@Tag(name = "info", description = "정보 API")
@RequiredArgsConstructor
public class InfoController {

  private final InfoService infoService;

  @Operation(summary = "카테고리 목록 조회 API")
  @GetMapping("/category")
  ResponseEntity<?> getNearSpotList() {
    try {
      return Response.makeResponse(HttpStatus.OK,
          "카테고리 목록 조회 성공",
          infoService.getCategories());
    } catch (Exception e) {
      log.error(e.getMessage());
      return Response.badRequest(e.getMessage());
    }
  }
}
