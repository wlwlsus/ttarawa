package com.jsdckj.ttarawa.spot.service;


import com.jsdckj.ttarawa.spot.dto.res.SpotResDto;
import com.jsdckj.ttarawa.spot.entity.Spot;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SpotService {

  List<SpotResDto.Spots> getSpotList(String category, Pageable pageable);

}
