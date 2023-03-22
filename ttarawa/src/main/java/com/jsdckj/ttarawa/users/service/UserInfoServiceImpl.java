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

    if (totalDistance < 1000000L) {
      usersInfo.updateBadge(badgeRepository.findById(1L).get());
    } else if (totalDistance < 2000000) {
      usersInfo.updateBadge(badgeRepository.findById(2L).get());
    } else if (totalDistance < 4000000) {
      usersInfo.updateBadge(badgeRepository.findById(3L).get());
    } else if (totalDistance < 5000000) {
      usersInfo.updateBadge(badgeRepository.findById(4L).get());
    } else {
      usersInfo.updateBadge(badgeRepository.findById(5L).get());

    }
  }

}
