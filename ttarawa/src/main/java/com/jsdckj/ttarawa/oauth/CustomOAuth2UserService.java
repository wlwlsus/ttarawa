package com.jsdckj.ttarawa.oauth;

import com.jsdckj.ttarawa.oauth.provider.GoogleUserInfo;
import com.jsdckj.ttarawa.oauth.provider.KakaoUserInfo;
import com.jsdckj.ttarawa.oauth.provider.NaverUserInfo;
import com.jsdckj.ttarawa.oauth.provider.OAuth2UserInfo;
import com.jsdckj.ttarawa.users.entity.Users;
import com.jsdckj.ttarawa.users.enums.Role;
import com.jsdckj.ttarawa.users.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

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
    OAuth2User oAuth2User = super.loadUser(userRequest);
    return process(userRequest, oAuth2User);
  }

  private OAuth2User process(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {

    OAuth2UserInfo userInfo = null;

    if (Objects.equals(userRequest.getClientRegistration().getRegistrationId(), "kakao")) {
      userInfo = new KakaoUserInfo(oAuth2User.getAttributes());
    } else if (Objects.equals(userRequest.getClientRegistration().getRegistrationId(), "naver")) {
      userInfo = new NaverUserInfo(oAuth2User.getAttributes());
    }
    else if(Objects.equals(userRequest.getClientRegistration().getRegistrationId(),"google")){
      userInfo = new GoogleUserInfo(oAuth2User.getAttributes());
    }


    // 이미 가입한 유저인지 확인
    Optional<Users> checkUser = userRepository.findByEmailAndProvider(userInfo.getEmail(), userInfo.getProvider());
    Users user;
    // 아직 가입이 되어있지 않다면
    if (checkUser.isEmpty()) {
      user = Users.builder()
          .email(userInfo.getEmail())
          .profile(userInfo.getProfileImg())
          .nickname(userInfo.getNickname())
          .provider(userInfo.getProvider())
          .role(Role.ROLE_USER)
          .build();
      userRepository.save(user);

    } else {
      user = checkUser.get();
    }

    System.out.println("userid " + user.getUsersId());
    log.info("og : {}", oAuth2User.getAttributes());
    return new UserDetailCustom(user,                                                                                                              oAuth2User.getAttributes());

  }
}
