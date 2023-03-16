package com.jsdckj.ttarawa.spot.dto.req;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

public class SpotReqDto {

  public static class SpotRecommend {

    @Schema(description = "유저 번호", example = "1")
    private long userId;

    @Schema(description = "카테고리 아이디", example = "1")
    private long category;

    @Schema(description = "위도", example = "37.52411336")
    private double lat;

    @Schema(description = "경도", example = "127.0368066")
    private double lng;

    private Pageable pageable;

  }
}
