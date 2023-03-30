package com.jsdckj.ttarawa.spot.controller;

import com.jsdckj.ttarawa.spot.service.SpotService;
import com.jsdckj.ttarawa.util.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


@Slf4j
@RestController
@RequestMapping("/api/v1/spot")
@Tag(name = "spot", description = "여행지 API")
@RequiredArgsConstructor
public class SpotController {

  private final SpotService spotService;

  @Operation(summary = "주변 추천 목적지 조회 API")
  @GetMapping("/{users_id}")
  ResponseEntity<?> getSpotList(
      @Schema(description = "유저 번호", example = "1")
      @PathVariable long users_id,
      @Schema(description = "카테고리 아이디", example = "0")
      @RequestParam(required = false)
      long category,
      @Schema(description = "위도", example = "37.501337948430814")
      @RequestParam
      double lat,
      @Schema(description = "경도", example = "127.03964423197847")
      @RequestParam
      double lng,
//			@PageableDefault(size = 10, page = 0, sort = "visit", direction = Sort.Direction.DESC)
      @Schema(hidden = true)
      Pageable pageable,
      @Schema(description = "페이지 별 개수", example = "10")
      @RequestParam
      int size,
      @Schema(description = "페이지", example = "0")
      @RequestParam
      int page
  ) {
    try {
      return Response.makeResponse(HttpStatus.OK,
          "목적지 리스트 조회를 성공",
          spotService.getRecommendSpotList(category, lat, lng, users_id, pageable));
    } catch (Exception e) {
      log.error(e.getMessage());
      return Response.badRequest(e.getMessage());
    }
  }

  @Operation(summary = "근처 목적지 조회 API")
  @GetMapping("/near")
  ResponseEntity<?> getNearSpotList(
      @Schema(description = "카테고리 아이디", example = "1")
      @RequestParam(required = false)
      long category,
      @Schema(description = "위도", example = "37.501337948430814")
      @RequestParam
      double lat,
      @Schema(description = "경도", example = "127.03964423197847")
      @RequestParam
      double lng,
      @Schema(hidden = true)
      Pageable pageable,
      @Schema(description = "페이지 별 개수", example = "10")
      @RequestParam
      int size,
      @Schema(description = "페이지", example = "0")
      @RequestParam
      int page) {
    try {
      return Response.makeResponse(HttpStatus.OK,
          "근처 목적지 조회 성공",
          spotService.getNearSpotList(category, lat, lng, pageable));
    } catch (Exception e) {
      log.error(e.getMessage());
      return Response.badRequest(e.getMessage());
    }
  }

  @Operation(summary = "형을 위한 테스트 POST API")
  @PostMapping("/test")
  public ResponseEntity<?> handleImageUpload(@RequestParam("image") MultipartFile file) {
    try {
      log.info("업로드 API");
      String uploadDir = "src/main/resources/static/uploads/";
      File dir = new File(uploadDir);
      if (!dir.exists()) {
        dir.mkdirs(); // 디렉토리가 없으면 생성
      }
      // 서버에 파일 저장하기
      Path path = Paths.get(uploadDir + file.getOriginalFilename());
      Files.write(path, file.getBytes());

      return ResponseEntity.ok("이미지 업로드가 완료되었습니다.");
    } catch (IOException e) {
      log.error("에러 : {}", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 중 오류가 발생했습니다. " + e);
    }
  }

  @Autowired
  private ResourceLoader resourceLoader;

  @GetMapping("/images/{filename:.+}")
  public ResponseEntity<Resource> serveFile(@PathVariable String filename) throws IOException {
    Resource file =resourceLoader.getResource("classpath:/static/uploads/" + filename);

    log.info("파일 명 : {}", filename);
    log.info("파일 객체 : ", file);
    if (!file.exists()) {
      return ResponseEntity.notFound().build();
    }

    HttpHeaders headers = new HttpHeaders();
    headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getFilename() + "\"");

    return ResponseEntity.ok()
        .headers(headers)
        .contentType(MediaType.parseMediaType("image/jpeg"))
        .body(file);
  }

  @GetMapping("/ping")
  public ResponseEntity<?> ping() throws IOException {
    return Response.makeResponse(HttpStatus.OK, "pong!");
  }
}
