package com.jsdckj.ttarawa.spot.dto.res;

import com.jsdckj.ttarawa.info.entity.Category;
import lombok.*;

public class SpotResDto {

  @Builder
  @Getter
  @Setter
  @AllArgsConstructor
  @NoArgsConstructor
  public static class Spots {

    private long spotId;
    private String address;
    private String name;
    private double lat;
    private double lng;
    private int visit;
    private double distance;
    private long categoryId;
    private String sub_category;
  }

  @Builder
  @Getter
  @Setter
  @AllArgsConstructor
  @NoArgsConstructor
  public static class RecommendSpot {

    private Long tourId;
    private String address;
    private String name;
    private double lat;
    private double lng;
    private String category;
    private String midCategory;
    private String subCategory;
    private double rating;
    private double reviews;
    private double distances;
  }
}
