package com.jsdckj.ttarawa.spot.entity;

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
  private Long spotId;

  @Column(name = "address")
  private String address;

  @Column(name = "name")
  private String name;

  @Column(name = "lat")
  private double lat;

  @Column(name = "lng")
  private double lng;

  @Column(name = "category")
  private String category;

  @Column(name = "mid_category")
  private String mid_category;

  @Column(name = "sub_category")
  private String sub_category;

  @Column(name = "search")
  private int search;

  @Column(name = "rating")
  private double rating;

  @Column(name = "reviews")
  private double reviews;
}
