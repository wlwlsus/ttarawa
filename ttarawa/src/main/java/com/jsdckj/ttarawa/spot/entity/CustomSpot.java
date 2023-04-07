package com.jsdckj.ttarawa.spot.entity;


import lombok.*;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CustomSpot {

  private Spot spot;
  private double distance;

}
