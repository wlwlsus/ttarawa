package com.jsdckj.ttarawa.history.entity;

import com.jsdckj.ttarawa.users.entity.Users;
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
@Table(name = "favorites")
public class Favorites {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "favorites_id", nullable = false, columnDefinition = "BIGINT UNSIGNED")
  private Long favoritesId;

  @ManyToOne
  @JoinColumn(name = "history_id", nullable = false)
  private History history;

  @ManyToOne
  @JoinColumn(name = "users_id", nullable = false)
  private Users users;

}
