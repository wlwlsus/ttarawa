package com.jsdckj.ttarawa.users.dto.res;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoResDto {

    private String nickname;
    private String badgeName;
    private Long totalDistance;
    private String profile;
    private String badgeImg;


}
