package com.jsdckj.ttarawa.history.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HistoryResDto {

  private Long historyId;
  private String nickname;
  private Long userId;
  private String profile;
  private String badgeImg;
  private int favoritesCount;
  private int isMyFavorite;
  private Long time;
  private Long distance;
  private String image;
  private String content;
  private String startAddress;
  private String endAddress;
  private int isMyHistory;


}
