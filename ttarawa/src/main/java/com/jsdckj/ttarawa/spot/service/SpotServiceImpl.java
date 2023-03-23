package com.jsdckj.ttarawa.spot.service;

import com.jsdckj.ttarawa.spot.dto.res.SpotResDto;
import com.jsdckj.ttarawa.spot.entity.CustomSpot;
import com.jsdckj.ttarawa.spot.entity.Spot;
import com.jsdckj.ttarawa.spot.entity.Tour;
import com.jsdckj.ttarawa.spot.repository.SpotRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Slf4j
@Service
@RequiredArgsConstructor
public class SpotServiceImpl implements SpotService {

  private final SpotRepository spotRepository;

  @Override
  public List<SpotResDto.Spots> getRecommendSpotList(long category, double lat, double lng, long userId, Pageable pageable) {
    int minDistance = 15;
    int maxDistance = 22;
    int numDestinations = 10;
//    Object userInfo = null;

    RestTemplate restTemplate = new RestTemplate();
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
//    headers.setBearerAuth(jwtToken); // JWT 토큰 설정

    Map<String, Object> requestData = new HashMap<>();
    requestData.put("lat", lat);
    requestData.put("lng", lng);
    requestData.put("min_distance", minDistance);
    requestData.put("max_distance", maxDistance);
    requestData.put("num_destinations", numDestinations);
//    requestData.put("user_info", userInfo);

    HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestData, headers);
    ResponseEntity<Tour[]> response = restTemplate.exchange("http://127.0.0.1:5000/recommendations", HttpMethod.GET, requestEntity, Tour[].class);
    Tour[] tours = response.getBody();

    log.info("플라스크 리턴 : {}", tours);

    // 추천 기준
    // 목적지 방문 횟수
    // 사용자의 최근 방문
    // 사용자의 평군 주헹 거리

    List<CustomSpot> data;

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

  public List<SpotResDto.Spots> getSpots(List<CustomSpot> spots) {
    List<SpotResDto.Spots> resData = new ArrayList<>();
    spots.forEach(d -> {
      Spot s = d.getSpot();
      double distance = Math.round(d.getDistance() * 100) / 100.0;

      resData.add(SpotResDto.Spots.builder()
          .spotId(s.getSpotId())
          .address(s.getAddress())
          .name(s.getName())
          .lat(s.getLat())
          .lng(s.getLng())
          .visit(s.getVisit())
          .categoryId(s.getCategory().getCategoryId())
          .distance(distance)
          .sub_category(s.getSub_category().trim())
          .build());
    });
    return resData;
  }
}
