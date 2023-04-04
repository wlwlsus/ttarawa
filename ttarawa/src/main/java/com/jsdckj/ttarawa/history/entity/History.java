package com.jsdckj.ttarawa.history.entity;

import com.jsdckj.ttarawa.users.entity.Users;
import com.jsdckj.ttarawa.util.BaseTimeEntity;
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
@Table(name = "history")
public class History extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "history_id", nullable = false, columnDefinition = "BIGINT UNSIGNED")
  private Long historyId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "users_id", insertable = false, updatable = false)
  private Users users;

  @Column(name="users_id")
  private Long usersId;

  @Column(name = "favorites_count", nullable = false)
  private int favoritesCount;

  @Column(name = "personal", nullable = false, columnDefinition = "TINYINT")
  private int personal;

  @Column(name = "time", nullable = false)
  private long time;

  @Column(name = "distance", nullable = false)
  private long distance;

  @Column(name = "image", nullable = false)
  private String image;

  @Column(name = "content", nullable = true)
  private String content;

  @Column(name="start_lat", nullable = false)
  private Double startLat;

  @Column(name="start_lng", nullable = false)
  private Double startLng;

  @Column(name="end_lat", nullable = false)
  private Double endLat;

  @Column(name="end_lng", nullable = false)
  private Double endLng;

  public void updateHistory(int personal, String content){
    this.personal = personal;
    this.content = content;
  }

  // 좋아요 1 증가
  public void plusFavoritesCount(){
    ++this.favoritesCount;
  }

  public void minusFavoritesCount(){
    --this.favoritesCount;
  }


}