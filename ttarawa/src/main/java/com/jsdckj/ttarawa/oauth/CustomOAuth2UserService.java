package com.jsdckj.ttarawa.oauth;

import com.jsdckj.ttarawa.oauth.entity.ProviderType;
import com.jsdckj.ttarawa.oauth.exception.OAuthProviderMissMatchException;
import com.jsdckj.ttarawa.oauth.info.OAuth2UserInfoFactory;
import com.jsdckj.ttarawa.oauth.provider.GoogleUserInfo;
import com.jsdckj.ttarawa.oauth.provider.KakaoUserInfo;
import com.jsdckj.ttarawa.oauth.provider.NaverUserInfo;
import com.jsdckj.ttarawa.oauth.provider.OAuth2UserInfo;
import com.jsdckj.ttarawa.users.entity.Users;
import com.jsdckj.ttarawa.users.entity.UsersInfo;
import com.jsdckj.ttarawa.users.enums.Role;
import com.jsdckj.ttarawa.users.repository.BadgeRepository;
import com.jsdckj.ttarawa.users.repository.UserInfoRepository;
import com.jsdckj.ttarawa.users.repository.UserRepository;
import com.nimbusds.openid.connect.sdk.claims.UserInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
  private final UserRepository userRepository;
  private final UserInfoRepository userInfoRepository;
  private final BadgeRepository badgeRepository;

  public CustomOAuth2UserService(UserRepository userRepository, UserInfoRepository userInfoRepository, BadgeRepository badgeRepository) {
    this.userRepository = userRepository;
    this.userInfoRepository = userInfoRepository;
    this.badgeRepository = badgeRepository;
  }

  @Override
  public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {


    // accessToken으로 서드파디에 요청해서 사용자 정보를 얻어옴
    OAuth2User user = super.loadUser(userRequest);
    System.out.println("sout load user");

    try {
      return this.process(userRequest, user);
    } catch (AuthenticationException ex) {
      throw ex;
    } catch (Exception ex) {
      ex.printStackTrace();
      throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
    }

//    return process(userRequest, oAuth2User);
  }


  private OAuth2User process(OAuth2UserRequest userRequest, OAuth2User user) {
    ProviderType providerType = ProviderType.valueOf(userRequest.getClientRegistration().getRegistrationId().toUpperCase());
    System.out.println("sout process providerType" + providerType);
    OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(providerType, user.getAttributes());
    Users savedUser = userRepository.findByEmailAndProvider(userInfo.getEmail(), ProviderType.valueOf(userInfo.getProvider()));

    if (savedUser != null) {
      System.out.println("sout p1 " + providerType);
      System.out.println("sout p2 " + savedUser.getProvider());
      if (providerType != savedUser.getProvider()) {
        throw new OAuthProviderMissMatchException(
            "Looks like you're signed up with " + providerType +
                " account. Please use your " + savedUser.getProvider() + " account to login."
        );
      }
      System.out.println("sout update user");
      updateUser(savedUser, userInfo);
    } else {
      System.out.println("sout user가 없어서 생성");
      savedUser = createUser(userInfo, providerType);
      userInfoRepository.save(UsersInfo.builder()
          .users(savedUser)
          .badge(badgeRepository.findByName("beginner"))
          .totalDistance(0L)
          .build());
    }

    return UserDetailCustom.create(savedUser, user.getAttributes());
//    return new UserDetailCustom(savedUser, user.getAttributes());


  }

  private Users createUser(OAuth2UserInfo oAuthUserInfo, ProviderType providerType) {
    System.out.println("sout create user");

    Users user = Users.builder()
        .email(oAuthUserInfo.getEmail())
        .profile(oAuthUserInfo.getProfileImg())
        .nickname(oAuthUserInfo.getNickname())
        .provider(ProviderType.valueOf(oAuthUserInfo.getProvider()))
        .role(Role.ROLE_USER)
        .build();

    System.out.println(badgeRepository.findByName("beginner"));


    return userRepository.saveAndFlush(user);
  }


  private Users updateUser(Users user, OAuth2UserInfo userInfo) {

    System.out.println("sout updateUser");
//    if (userInfo.getNickname() != null && !user.getNickname().equals(userInfo.getNickname())) {
//      user.setNi(userInfo.getNickname());
//    }
//
//    if (userInfo.getImageUrl() != null && !user.getProfileImageUrl().equals(userInfo.getImageUrl())) {
//      user.setProfileImageUrl(userInfo.getImageUrl());
//    }

    return user.builder()
        .nickname(user.getNickname())
        .profile(user.getProfile())
        .build();
  }

}
