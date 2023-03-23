package com.jsdckj.ttarawa.oauth.provider;

import java.util.Map;

public class KakaoUserInfo implements OAuth2UserInfo {

  private final Map<String, Object> attributes;
  private final Map<?, ?> properties;
  private final Map<?, ?> account;


  public KakaoUserInfo(Map<String, Object> attributes) {
    this.attributes = attributes;
    properties = (Map<?, ?>) attributes.get("properties");
    account = (Map<?, ?>) attributes.get("kakao_account");
  }

  @Override
  public String getProvider() {
    return "KAKAO";
  }

  @Override
  public String getEmail() {
    return account.get("email").toString();
  }

  @Override
  public String getNickname() {
    return properties.get("nickname").toString();
  }

  @Override
  public String getProfileImg() {
    return properties.get("profile_image").toString();
  }
}
