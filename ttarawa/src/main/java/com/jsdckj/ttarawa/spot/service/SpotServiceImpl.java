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
  public List<SpotResDto.Spots> getSpotList(String category, Pageable pageable) {
//    if (category.equals("음식점")) {
//      return switch (length) {
//        case 3, 5, 10 -> spotRepository.findByLength(length, pageable).getContent();
//        default -> spotRepository.findAll(pageable).getContent();
//      };
//    } else if (category.equals("카페")) {
//      return switch (length) {
//        case 3, 5, 10 -> spotRepository.findByLengthAndCategoryCategoryId(length, category, pageable).getContent();
//        default -> spotRepository.findByCategoryCategoryId(category, pageable).getContent();
//      };
//    }
//    return spotRepository.findAll(pageable).getContent();


    List<Spot> data = spotRepository.findAll(pageable).getContent();
    log.info("data : {}", data);
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
