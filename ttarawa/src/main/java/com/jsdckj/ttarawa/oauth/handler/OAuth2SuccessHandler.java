package com.jsdckj.ttarawa.oauth.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jsdckj.ttarawa.jwt.JwtTokenProvider;
import com.jsdckj.ttarawa.oauth.OAuth2AuthorizationRequestBasedOnCookieRepository;
import com.jsdckj.ttarawa.oauth.entity.ProviderType;
import com.jsdckj.ttarawa.oauth.entity.RoleType;
import com.jsdckj.ttarawa.oauth.info.OAuth2UserInfoFactory;
import com.jsdckj.ttarawa.oauth.provider.OAuth2UserInfo;
import com.jsdckj.ttarawa.users.dto.res.UserResDto;
import com.jsdckj.ttarawa.util.CookieUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URI;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import static com.jsdckj.ttarawa.oauth.OAuth2AuthorizationRequestBasedOnCookieRepository.REDIRECT_URI_PARAM_COOKIE_NAME;
import static com.jsdckj.ttarawa.oauth.OAuth2AuthorizationRequestBasedOnCookieRepository.REFRESH_TOKEN;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

  private final JwtTokenProvider tokenProvider;
  private final RedisTemplate redisTemplate;

  private final OAuth2AuthorizationRequestBasedOnCookieRepository authorizationRequestRepository;


  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {

    System.out.println("들어왔니??!!!!!");
    String targetUrl = determineTargetUrl(request, response, authentication);



    if (response.isCommitted()) {
      System.out.println("sout 이미 commited?");
      logger.info("Response has already been committed. Unable to redirect to ");
      return;
    }

//    System.out.println("success handler");
//
//    clearAuthenticationAttributes(request);
//    UserResDto.TokenInfo tokenInfo = tokenProvider.generateToken(authentication);
//
//    // refresh token Redis 저장 (expirationTime 설정 통해 자동 삭제 처리)
//    redisTemplate.opsForValue()
//        .set("RT:"+authentication.getName(),tokenInfo.getRefreshToken(),tokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);
//
//    ObjectMapper om = new ObjectMapper();
//    String jsonStr = null;
//
//
//    try (PrintWriter writer = response.getWriter();){
//      jsonStr = om.writeValueAsString(tokenInfo);
//      writer.print(jsonStr);
//    } catch (JsonProcessingException e) {
//      logger.error("Failed to generate token JSON", e);
//    }
    clearAuthenticationAttributes(request, response);
    getRedirectStrategy().sendRedirect(request, response, targetUrl);

  }
  protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
    System.out.println("sout determineTargetUrl");

    Optional<String> redirectUri = CookieUtil.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
        .map(Cookie::getValue);

    if (redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
      throw new IllegalArgumentException("Sorry! We've got an Unauthorized Redirect URI and can't proceed with the authentication");
    }

    String targetUrl = redirectUri.orElse(getDefaultTargetUrl());
    System.out.println("sout Target Uri " + targetUrl);

    OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
    ProviderType providerType = ProviderType.valueOf(authToken.getAuthorizedClientRegistrationId().toUpperCase());

    System.out.println("sout auth Token "+ authToken);
    System.out.println("sout provider type "+ providerType);

    OidcUser user = ((OidcUser) authentication.getPrincipal());
    OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(providerType, user.getAttributes());
    Collection<? extends GrantedAuthority> authorities = ((OidcUser) authentication.getPrincipal()).getAuthorities();

//    RoleType roleType = hasAuthority(authorities, RoleType.ADMIN.name()) ? RoleType.ADMIN : RoleType.ROLE_USER;

    UserResDto.TokenInfo tokenInfo = tokenProvider.generateToken(authentication);

    redisTemplate.opsForValue()
        .set("RT:" + authentication.getName(), tokenInfo.getRefreshToken(), tokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);

    int cookieMaxAge = (int) 604800000 / 60;


    CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
    CookieUtil.addCookie(response, REFRESH_TOKEN, tokenInfo.getRefreshToken(), cookieMaxAge);

    return UriComponentsBuilder.fromUriString(targetUrl)
        .queryParam("token", tokenInfo.getAccessToken())
//        .queryParam("refreshToken", tokenInfo.getRefreshToken())
        .build().toUriString();
  }

//  protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
//    System.out.println("sout determineTargetUrl");
//    Optional<String> redirectUri = CookieUtil.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
//        .map(Cookie::getValue);
//
//    if(redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
//      throw new IllegalArgumentException("Sorry! We've got an Unauthorized Redirect URI and can't proceed with the authentication");
//    }
//
//    String targetUrl = redirectUri.orElse(getDefaultTargetUrl());
//    System.out.println("sout Target Uri " + targetUrl);
//
//    OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
//    ProviderType providerType = ProviderType.valueOf(authToken.getAuthorizedClientRegistrationId().toUpperCase());
//
//    System.out.println("sout auth Token "+ authToken);
//    System.out.println("sout provider type "+ providerType);
//
//    OidcUser user = ((OidcUser) authentication.getPrincipal());
//    OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(providerType, user.getAttributes());
//    Collection<? extends GrantedAuthority> authorities = ((OidcUser) authentication.getPrincipal()).getAuthorities();
//
//    RoleType roleType = hasAuthority(authorities, RoleType.ADMIN.getCode()) ? RoleType.ADMIN : RoleType.USER;
//    System.out.println("sout role type"+roleType);
//
//
//    Date now = new Date();
//    AuthToken accessToken = tokenProvider.createAuthToken(
//        userInfo.getId(),
//        roleType.getCode(),
//        new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
//    );
//
//    System.out.println("sout access token " + accessToken);
//
//    // refresh 토큰 설정
//    long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();
//
//    AuthToken refreshToken = tokenProvider.createAuthToken(
//        appProperties.getAuth().getTokenSecret(),
//        new Date(now.getTime() + refreshTokenExpiry)
//    );
//
//    System.out.println("sout refresh token " + refreshToken);
//
//
//    // DB 저장
////        UserRefreshToken userRefreshToken = userRefreshTokenRepository.findByUserId(userInfo.getId());
////        if (userRefreshToken != null) {
////            userRefreshToken.setRefreshToken(refreshToken.getToken());
////        } else {
////            userRefreshToken = new UserRefreshToken(userInfo.getId(), refreshToken.getToken());
////            userRefreshTokenRepository.saveAndFlush(userRefreshToken);
////        }
//
//
//    int cookieMaxAge = (int) refreshTokenExpiry / 60;
//
//    CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
//    CookieUtil.addCookie(response, REFRESH_TOKEN, refreshToken.getToken(), cookieMaxAge);
//
//    System.out.println("sout delete and add cookie");
//
//    return UriComponentsBuilder.fromUriString(targetUrl)
//        .queryParam("token", accessToken.getToken())
//        .build().toUriString();
//  }


  protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
    super.clearAuthenticationAttributes(request);

    System.out.println("sout clearAuthenticationAttributes");
    authorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
  }
  private boolean hasAuthority(Collection<? extends GrantedAuthority> authorities, String authority) {
    System.out.println("sout has authority");
    if (authorities == null) {
      return false;
    }

    for (GrantedAuthority grantedAuthority : authorities) {
      if (authority.equals(grantedAuthority.getAuthority())) {
        return true;
      }
    }
    return false;
  }

//  private boolean isAuthorizedRedirectUri(String uri) {
//    URI clientRedirectUri = URI.create(uri);
//    System.out.println("sout isAuthorizedRedirectUri "+ uri);
//
//    return appProperties.getOauth2().getAuthorizedRedirectUris()
//        .stream()
//        .anyMatch(authorizedRedirectUri -> {
//          // Only validate host and port. Let the clients use different paths if they want to
//          URI authorizedURI = URI.create(authorizedRedirectUri);
//          if(authorizedURI.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
//              && authorizedURI.getPort() == clientRedirectUri.getPort()) {
//            return true;
//          }
//          return false;
//        });


  private boolean isAuthorizedRedirectUri(String uri) {
    URI clientRedirectUri = URI.create(uri);
    URI authorizedUri = URI.create("http://localhost:3000/oauth/redirect");
    System.out.println("sout isAuthorizedRedirectUri "+ uri);
    return authorizedUri.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
        && authorizedUri.getPort() == clientRedirectUri.getPort();

  }


}
