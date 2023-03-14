package com.jsdckj.ttarawa.users.entity;

import com.jsdckj.ttarawa.util.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class Users extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "users_id", nullable = false, columnDefinition = "BIGINT UNSIGNED")
  private Long usersId;

  @Column(name = "email", nullable = false)
  private String email;

  @Column(name = "nickname", nullable = false, length = 15)
  private String nickname;

  @Column(name = "profile", nullable = true)
  private String profile;

  @Column(name = "provider", nullable = false, length = 15)
  private String provider;

}

