package com.jsdckj.ttarawa.users.service;

import com.jsdckj.ttarawa.users.entity.Badge;
import com.jsdckj.ttarawa.users.entity.Users;

public interface UserInfoService {

  void updateBadge(Users user, Long totalDistance);

}
