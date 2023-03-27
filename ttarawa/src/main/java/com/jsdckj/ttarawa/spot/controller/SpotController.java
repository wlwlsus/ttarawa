package com.jsdckj.ttarawa.spot.controller;

import com.jsdckj.ttarawa.jwt.JwtUtil;
import com.jsdckj.ttarawa.spot.service.SpotService;
import com.jsdckj.ttarawa.util.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.jsdckj.ttarawa.jwt.JwtProperties.TOKEN_HEADER;


@Slf4j
@RestController
@RequestMapping("/api/v1/spot")
@Tag(name = "spot", description = "여행지 API")
@RequiredArgsConstructor
public class SpotController {

	private final SpotService spotService;
	private final JwtUtil jwtUtil;

	@Operation(summary = "추천 목적지 조회 API")
	@GetMapping("/")
	ResponseEntity<?> getSpotList(
			HttpServletRequest request,
//      @Schema(description = "유저 번호", example = "1")
//      @PathVariable long user_id,
			@Schema(description = "위도", example = "37.501337948430814")
			@RequestParam
			double lat,
			@Schema(description = "경도", example = "127.03964423197847")
			@RequestParam
			double lng,
//      @Schema(description = "최소 거리", example = "15")
//      @RequestParam
//      int min_distance,
//      @Schema(description = "최대 거리", example = "22")
//      @RequestParam
//      int max_distance,
			@Schema(hidden = true)
			Pageable pageable,
			@Schema(description = "표시할 개수", example = "10")
			@RequestParam
			int size
	) {
		try {
			Long userId = jwtUtil.getUserId(request.getHeader(TOKEN_HEADER));
			return Response.makeResponse(HttpStatus.OK,
					"목적지 리스트 조회를 성공",
					spotService.getRecommendSpotList(lat, lng, pageable, userId));
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


}
