package com.jsdckj.ttarawa.history.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MyHistoryResDto {

  private Long historyId;
  private int favoritesCount;
  private int personal;
  private Long time;
  private Long distance;
  private String image;
  private String content;
  private int isMyFavorite;



}
