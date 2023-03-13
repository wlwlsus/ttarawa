package com.jsdckj.ttarawa.spot.controller;

import com.jsdckj.ttarawa.spot.service.SpotService;
import com.jsdckj.ttarawa.util.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequestMapping("/api/v1/spot")
@Tag(name = "spot", description = "여행지 API")
@RequiredArgsConstructor
public class SpotController {

  private final SpotService spotService;

  @Operation(summary = "전체 목적지 조회 API")
  @GetMapping("/{users_id}")
  ResponseEntity<?> getSpotList(@Parameter(description = "카테고리 아이디")
                                @RequestParam(required = false) String category,
                                @PageableDefault(size = 10, page = 0, sort = "visit", direction = Sort.Direction.DESC) Pageable pageable,
                                @PathVariable String users_id) {
    try {
      log.info("요청! : {}", users_id);
      return Response.makeResponse(HttpStatus.OK,
          "목적지 리스트 조회를 성공하였습니다",
          spotService.getSpotList(category, pageable));
    } catch (Exception e) {
      log.error(e.getMessage());
      return Response.badRequest(e.getMessage());
    }
  }

//    if (data == null) return Response.notFound("목적지 리스트 조회를 실패하였습니다");
//
//    List<SpotResDto.Spots> resData = new ArrayList<>();
//    data.forEach(d -> resData.add(SpotResDto.Spots.builder()
//        .address(d.getAddress())
//        .lat(d.getLat())
//        .lng(d.getLng())
//        .visit(d.getVisit())
//        .category(d.getCategory())
//        .sub_category(d.getSub_category())
//        .build()));
//
//    log.info("data : {}", data);
//    return Response.makeResponse(HttpStatus.OK, "목적지 리스트 조회를 성공하였습니다", resData);

}
