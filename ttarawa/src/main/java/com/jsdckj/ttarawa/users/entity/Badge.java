package com.jsdckj.ttarawa.users.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="badge")
public class Badge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="badge_id", nullable = false, columnDefinition = "BIGINT UNSIGNED")
    private Long badgeId;

    @Column(name="image", nullable = false)
    private String image;

    @Column(name="name", nullable = false)
    private String name;

}
