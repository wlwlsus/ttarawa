package com.jsdckj.ttarawa.oauth.provider;

public interface OAuth2UserInfo {

  String getProvider();
  String getEmail();
  String getNickname();
  String getProfileImg();

}
