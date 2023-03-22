package com.jsdckj.ttarawa.history.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FavoriteResDto {

  private Long favoritesId;
  private Long historyId;
  private String nickname;
  private String image;
  private Long distance;
  private Long time;
  private String startAddress;
  private String endAddress;
  private int isMyHistory;



}
