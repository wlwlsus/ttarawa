package com.jsdckj.ttarawa.users.service;

import com.jsdckj.ttarawa.users.entity.Badge;
import com.jsdckj.ttarawa.users.entity.Users;
import com.jsdckj.ttarawa.users.entity.UsersInfo;
import com.jsdckj.ttarawa.users.repository.BadgeRepository;
import com.jsdckj.ttarawa.users.repository.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserInfoServiceImpl implements UserInfoService {

  private final UserInfoRepository userInfoRepository;
  private final BadgeRepository badgeRepository;


  @Override
  public void updateBadge(Users user, Long totalDistance) {

    // 주행 거리에 따라 뱃지 업데이트
    UsersInfo usersInfo = userInfoRepository.findByUsers(user);

    if (totalDistance < 10L) {
      usersInfo.updateBadge(badgeRepository.findByName("새싹 라이더"));
    } else if (totalDistance < 20L) {
      usersInfo.updateBadge(badgeRepository.findByName("주니어 라이더"));
    } else if (totalDistance < 40L) {
      usersInfo.updateBadge(badgeRepository.findByName("아마추어 라이더"));
    } else if (totalDistance < 60L) {
      usersInfo.updateBadge(badgeRepository.findByName("프로 라이더"));
    } else {
      usersInfo.updateBadge(badgeRepository.findByName("레이서"));

    }
  }

}
