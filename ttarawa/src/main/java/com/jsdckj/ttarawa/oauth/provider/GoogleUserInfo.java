package com.jsdckj.ttarawa.oauth.provider;

import java.util.Map;

public class GoogleUserInfo implements OAuth2UserInfo {

  private Map<String, Object> attributes;

  public GoogleUserInfo(Map<String, Object> attributes){
    this.attributes = attributes;
  }


  @Override
  public String getProvider() {
    return "google";
  }

  @Override
  public String getEmail() {
    return attributes.get("email").toString();
  }

  @Override
  public String getNickname() {
    return attributes.get("name").toString();
  }

  @Override
  public String getProfileImg() {
    return attributes.get("picture").toString();
  }
}
