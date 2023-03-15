package com.jsdckj.ttarawa.spot.service;


import com.jsdckj.ttarawa.spot.dto.res.SpotResDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SpotService {

  List<SpotResDto.Spots> getRecommendSpotList(long category, double lat, double lng, long userId, Pageable pageable);

  List<SpotResDto.Spots> getNearSpotList(long category, double lat, double lng, Pageable pageable);

}
