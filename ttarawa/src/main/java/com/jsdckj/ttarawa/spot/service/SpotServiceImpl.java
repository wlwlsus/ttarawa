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
  public List<SpotResDto.Spots> getRecommendSpotList(long category, double lat, double lng, long userId, Pageable pageable) {
    // 추천 기준
    // 목적지 방문 횟수
    // 사용자의 최근 방문
    // 사용자의 평군 주헹 거리

    List<Spot> data;

    if (category == 0)
      data = spotRepository.findSpotsByLatAndLngAndCategoryCategoryIdNot(lat, lng, 4L, pageable).getContent();
    else
      data = spotRepository.findSpotsByLatAndLngAndCategoryCategoryId(lat, lng, category, pageable).getContent();

    return getSpots(data);
  }

  @Override
  public List<SpotResDto.Spots> getNearSpotList(long category, double lat, double lng, Pageable pageable) {
    return getSpots(spotRepository.findSpotsByLatAndLngAndCategoryCategoryId(lat, lng, category, pageable).getContent());
  }

  public List<SpotResDto.Spots> getSpots(List<Spot> spots) {
    List<SpotResDto.Spots> resData = new ArrayList<>();
    spots.forEach(d -> resData.add(SpotResDto.Spots.builder()
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
