package com.jsdckj.ttarawa.spot.service;

import com.jsdckj.ttarawa.spot.dto.res.SpotResDto;
import com.jsdckj.ttarawa.spot.entity.Spot;
import com.jsdckj.ttarawa.spot.repository.SpotRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
public class SpotServiceImpl implements SpotService {

  private final SpotRepository spotRepository;

  @Override
  public List<SpotResDto.Spots> getSpotList(long category, Pageable pageable) {
    List<Spot> data;

//    List<Spot> test = spotRepository.findSpotsByLatAndLng(37.51830537, 126.9063392, pageable).getContent();


    if (category == 0)
      data = spotRepository.findSpotsByCategoryCategoryIdNot(4L, pageable).getContent();
    else
      data = spotRepository.findSpotsByCategoryCategoryId(category, pageable).getContent();

    List<SpotResDto.Spots> resData = new ArrayList<>();
    data.forEach(d -> resData.add(SpotResDto.Spots.builder()
        .address(d.getAddress())
        .name(d.getName())
        .lat(d.getLat())
        .lng(d.getLng())
        .visit(d.getVisit())
        .category(d.getCategory())
        .sub_category(d.getSub_category().trim())
        .build()));

    return resData;
  }
}
