package com.jsdckj.ttarawa.oauth.info;

import com.jsdckj.ttarawa.oauth.entity.ProviderType;
import com.jsdckj.ttarawa.oauth.provider.GoogleUserInfo;
import com.jsdckj.ttarawa.oauth.provider.KakaoUserInfo;
import com.jsdckj.ttarawa.oauth.provider.NaverUserInfo;
import com.jsdckj.ttarawa.oauth.provider.OAuth2UserInfo;

import java.util.Map;

public class OAuth2UserInfoFactory {
  public static OAuth2UserInfo getOAuth2UserInfo(ProviderType providerType, Map<String, Object> attributes) {
    switch (providerType) {
      case GOOGLE: return new GoogleUserInfo(attributes);
      case NAVER: return new NaverUserInfo(attributes);
      case KAKAO: return new KakaoUserInfo(attributes);
      default: throw new IllegalArgumentException("Invalid Provider Type.");
    }
  }
}
