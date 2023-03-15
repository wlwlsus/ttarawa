package com.jsdckj.ttarawa.users.entity;

import com.jsdckj.ttarawa.oauth.entity.ProviderType;
import com.jsdckj.ttarawa.users.enums.Role;
import com.jsdckj.ttarawa.util.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="users")
public class Users extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="users_id", nullable = false, columnDefinition = "BIGINT UNSIGNED")
    private Long userId;

    @Column(name="email", nullable = false)
    private String email;

    @Column(name="nickname", nullable = false, length = 15)
    private String nickname;

    @Column(name="profile", nullable = false)
    private String profile;

    @Column(name="provider", nullable = false, length = 15)
    @Enumerated(EnumType.STRING)
    private ProviderType provider;

    @Column(name="role")
    @Enumerated(EnumType.STRING)
    private Role role;

    public void updateUserNickname(String nickname){
        this.nickname = nickname;
    }



}
