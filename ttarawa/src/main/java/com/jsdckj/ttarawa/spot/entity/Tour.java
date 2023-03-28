package com.jsdckj.ttarawa.spot.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.jsdckj.ttarawa.info.entity.Category;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tour")
public class Tour {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "tour_id", nullable = false, columnDefinition = "BIGINT(20) UNSIGNED")
  @JsonProperty("tour_id")
  private Long tourId;

  @Column(name = "address")
  @JsonProperty("address")
  private String address;

  @Column(name = "name")
  @JsonProperty("name")
  private String name;

  @Column(name = "lat")
  @JsonProperty("lat")
  private double lat;

  @Column(name = "lng")
  @JsonProperty("lng")
  private double lng;

  @Column(name = "category")
  @JsonProperty("category")
  private String category;

  @Column(name = "mid_category")
  @JsonProperty("mid_category")
  private String midCategory;

  @Column(name = "sub_category")
  @JsonProperty("sub_category")
  private String subCategory;

  @Column(name = "search")
  @JsonProperty("search")
  private int search;

  @Column(name = "rating")
  @JsonProperty("rating")
  private double rating;

  @Column(name = "reviews")
  @JsonProperty("reviews")
  private double reviews;

  @JsonProperty("distances")
  private double distance;



}
