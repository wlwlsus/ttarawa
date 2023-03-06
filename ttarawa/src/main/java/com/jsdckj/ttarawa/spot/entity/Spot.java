package com.jsdckj.ttarawa.spot.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "spot")
public class Spot {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "spot_id", nullable = false, columnDefinition = "BIGINT(20) UNSIGNED")
  private Long spotId;

  @Column(name = "address")
  private String address;

  @Column(name = "name")
  private String name;

  @Column(name = "lat")
  private double lat;

  @Column(name = "lng")
  private double lng;

  @Column(name = "visit")
  private int visit;

  @Column(name = "category")
  private String category;

  @Column(name = "sub_category")
  private String sub_category;

}
