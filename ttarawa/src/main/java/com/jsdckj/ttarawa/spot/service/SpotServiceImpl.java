package com.jsdckj.ttarawa.spot.service;

import com.jsdckj.ttarawa.history.repository.HistoryRepository;
import com.jsdckj.ttarawa.spot.dto.res.SpotResDto;
import com.jsdckj.ttarawa.spot.entity.CustomSpot;
import com.jsdckj.ttarawa.spot.entity.Spot;
import com.jsdckj.ttarawa.spot.entity.Tour;
import com.jsdckj.ttarawa.spot.repository.SpotRepository;
import com.jsdckj.ttarawa.users.entity.UsersInfo;
import com.jsdckj.ttarawa.users.repository.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;


@Slf4j
@Service
@RequiredArgsConstructor
public class SpotServiceImpl implements SpotService {

  @Value("${flask-address}")
  private String flaskAddress;

  private final UserInfoRepository userInfoRepository;
  private final SpotRepository spotRepository;
  private final HistoryRepository historyRepository;
  private final RestTemplate restTemplate = new RestTemplate();
  private final HttpHeaders headers = new HttpHeaders();

  // 추천 기준 : 사용자의 평균 주헹 거리
  @Override
  public List<SpotResDto.RecommendSpot> getRecommendSpotList(double lat, double lng, int minDistance, int maxDistance, Pageable pageable, long userId) {

    Optional<UsersInfo> usersInfo = userInfoRepository.findUsersInfoByUsers_UsersId(userId);

    Long count = historyRepository.countByUserId(userId);
    double avgDistance = 0;
    if (usersInfo.isPresent()) {
      long totalDistance = usersInfo.get().getTotalDistance();
      if (totalDistance > 0L && count >= 0L)
        avgDistance = (totalDistance / 1000.0) / count;
    }


    headers.setContentType(MediaType.APPLICATION_JSON);
    Map<String, Object> requestData = new HashMap<>();
    requestData.put("lat", lat);
    requestData.put("lng", lng);
    requestData.put("min_distance", minDistance);
    requestData.put("max_distance", maxDistance);
    requestData.put("num_destinations", pageable.getPageSize());
    requestData.put("user_info", avgDistance);

    HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestData, headers);
    ResponseEntity<Tour[]> response = restTemplate.exchange(flaskAddress + "/recommendations", HttpMethod.POST, requestEntity, Tour[].class);
    Tour[] tours = response.getBody();
    log.info("플라스크 리턴 : {}", Arrays.toString(tours));

    if (tours == null) {
      log.info("추천 목록 null");
      return null;
    }

    return getRecommendSpots(Arrays.asList(tours));

//    List<CustomSpot> data;
//    if (category == 0)
//      data = spotRepository.findSpotsByLatAndLngAndCategoryCategoryIdNot(lat, lng, 4L, pageable).getContent();
//    else
//      data = spotRepository.findSpotsByLatAndLngAndCategoryCategoryId(lat, lng, category, pageable).getContent();


  }

  // 인접 1km 무작위 정보 제공
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

  public List<SpotResDto.RecommendSpot> getRecommendSpots(List<Tour> tours) {
    List<SpotResDto.RecommendSpot> resData = new ArrayList<>();
    tours.forEach(s -> {
      double distance = Math.round(s.getDistance() * 100) / 100.0;
      resData.add(SpotResDto.RecommendSpot.builder()
          .tourId(s.getTourId())
          .address(s.getAddress())
          .name(s.getName())
          .lat(s.getLat())
          .lng(s.getLng())
          .category(s.getCategory())
          .midCategory(s.getCategory())
          .subCategory(s.getCategory())
          .rating(s.getRating())
          .reviews(s.getReviews())
          .distances(distance)
          .build());
    });
    return resData;
  }
}
