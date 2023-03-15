package com.jsdckj.ttarawa.oauth;

import com.jsdckj.ttarawa.oauth.entity.ProviderType;
import com.jsdckj.ttarawa.oauth.exception.OAuthProviderMissMatchException;
import com.jsdckj.ttarawa.oauth.info.OAuth2UserInfoFactory;
import com.jsdckj.ttarawa.oauth.provider.GoogleUserInfo;
import com.jsdckj.ttarawa.oauth.provider.KakaoUserInfo;
import com.jsdckj.ttarawa.oauth.provider.NaverUserInfo;
import com.jsdckj.ttarawa.oauth.provider.OAuth2UserInfo;
import com.jsdckj.ttarawa.users.entity.Users;
import com.jsdckj.ttarawa.users.enums.Role;
import com.jsdckj.ttarawa.users.repository.UserRepository;
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

  public CustomOAuth2UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
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
    System.out.println("sout process providerType"+providerType);
    OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(providerType, user.getAttributes());
    Users savedUser = userRepository.findByEmailAndProvider(userInfo.getEmail(), ProviderType.valueOf(userInfo.getProvider()));

    if (savedUser != null) {
      System.out.println("sout p1 "+providerType);
      System.out.println("sout p2 "+savedUser.getProvider());
      if (providerType!=savedUser.getProvider()) {
        throw new OAuthProviderMissMatchException(
            "Looks like you're signed up with " + providerType +
                " account. Please use your " + savedUser.getProvider() + " account to login."
        );
      }
      System.out.println("update user 해야해");
      updateUser(savedUser, userInfo);
    } else {
      System.out.println("sout user가 없어서 생성");
      savedUser = createUser(userInfo, providerType);
    }

    return UserDetailCustom.create(savedUser, user.getAttributes());
//    return new UserDetailCustom(savedUser, user.getAttributes());


  }

  private Users createUser(OAuth2UserInfo userInfo, ProviderType providerType) {
    System.out.println("sout create user");
//    LocalDateTime now = LocalDateTime.now();
//    Users user = new Users(
//        userInfo.getId(),
//        userInfo.getName(),
//        userInfo.getEmail(),
//        "Y",
//        userInfo.getImageUrl(),
//        providerType,
//        RoleType.USER,
//        now,
//        now
//    );


    Users  user = Users.builder()
        .email(userInfo.getEmail())
        .profile(userInfo.getProfileImg())
        .nickname(userInfo.getNickname())
        .provider(ProviderType.valueOf(userInfo.getProvider()))
        .role(Role.ROLE_USER)
        .build();

    return userRepository.saveAndFlush(user);
  }

//  private Users updateUser(Users user, OAuth2UserInfo userInfo) {
//
//    System.out.println("sout updateUser");
//    if (userInfo.getNickname() != null && !user.getUsername().equals(userInfo.getName())) {
//      user.setUsername(userInfo.getName());
//    }
//
//    if (userInfo.getImageUrl() != null && !user.getProfileImageUrl().equals(userInfo.getImageUrl())) {
//      user.setProfileImageUrl(userInfo.getImageUrl());
//    }
//
//    return user;
//  }


//  private OAuth2User process(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {
//
//    OAuth2UserInfo userInfo = null;
//
//    if (Objects.equals(userRequest.getClientRegistration().getRegistrationId(), "kakao")) {
//      userInfo = new KakaoUserInfo(oAuth2User.getAttributes());
//    } else if (Objects.equals(userRequest.getClientRegistration().getRegistrationId(), "naver")) {
//      userInfo = new NaverUserInfo(oAuth2User.getAttributes());
//    }
//    else if(Objects.equals(userRequest.getClientRegistration().getRegistrationId(),"google")){
//      userInfo = new GoogleUserInfo(oAuth2User.getAttributes());
//    }
//
//
//    // 이미 가입한 유저인지 확인
//    Optional<Users> checkUser = userRepository.findByEmailAndProvider(userInfo.getEmail(), userInfo.getProvider());
//    Users user;
//    // 아직 가입이 되어있지 않다면
//    if (checkUser.isEmpty()) {
//      user = Users.builder()
//          .email(userInfo.getEmail())
//          .profile(userInfo.getProfileImg())
//          .nickname(userInfo.getNickname())
//          .provider(userInfo.getProvider())
//          .role(Role.ROLE_USER)
//          .build();
//      userRepository.save(user);
//
//    } else {
//      user = checkUser.get();
//    }
//
//    System.out.println("userid " + user.getUsersId());
//    log.info("og : {}", oAuth2User.getAttributes());
//    return new UserDetailCustom(user,                                                                                                              oAuth2User.getAttributes());
//
//  }


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
