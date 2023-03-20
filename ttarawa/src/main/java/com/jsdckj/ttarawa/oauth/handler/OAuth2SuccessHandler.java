package com.jsdckj.ttarawa.oauth.handler;

import com.jsdckj.ttarawa.jwt.JwtTokenProvider;
import com.jsdckj.ttarawa.oauth.OAuth2AuthorizationRequestBasedOnCookieRepository;
import com.jsdckj.ttarawa.oauth.entity.ProviderType;
import com.jsdckj.ttarawa.oauth.entity.RoleType;
import com.jsdckj.ttarawa.oauth.info.OAuth2UserInfoFactory;
import com.jsdckj.ttarawa.oauth.provider.OAuth2UserInfo;
import com.jsdckj.ttarawa.users.dto.res.UserResDto;
import com.jsdckj.ttarawa.users.entity.Users;
import com.jsdckj.ttarawa.users.repository.UserRepository;
import com.jsdckj.ttarawa.util.CookieUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.Collection;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import static com.jsdckj.ttarawa.jwt.JwtProperties.REFRESH_TOKEN_EXPIRE_TIME;
import static com.jsdckj.ttarawa.oauth.OAuth2AuthorizationRequestBasedOnCookieRepository.REDIRECT_URI_PARAM_COOKIE_NAME;
import static com.jsdckj.ttarawa.oauth.OAuth2AuthorizationRequestBasedOnCookieRepository.REFRESH_TOKEN;


@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

  private final OAuth2AuthorizationRequestBasedOnCookieRepository authorizationRequestRepository;
  private final JwtTokenProvider tokenProvider;
  private final RedisTemplate<String, String> redisTemplate;

  private final UserRepository userRepository;

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {

    System.out.println("들어왔니??!!!!!");
    String targetUrl = determineTargetUrl(request, response, authentication);

    if (response.isCommitted()) {
      System.out.println("sout 이미 commited?");
      logger.info("Response has already been committed. Unable to redirect to ");
      return;
    }

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

    System.out.println("sout auth Token " + authToken);
    System.out.println("sout provider type " + providerType);

    OidcUser user = ((OidcUser) authentication.getPrincipal());
    OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(providerType, user.getAttributes());
    Collection<? extends GrantedAuthority> authorities = ((OidcUser) authentication.getPrincipal()).getAuthorities();

//    RoleType roleType = hasAuthority(authorities, RoleType.ADMIN.name()) ? RoleType.ADMIN : RoleType.ROLE_USER;

    System.out.println("sout email " + userInfo.getEmail());
    Users currentUser = userRepository.findByEmailAndProvider(userInfo.getEmail(), providerType);

    UserResDto.TokenInfo tokenInfo = tokenProvider.generateToken(authentication, currentUser.getUserId());

    redisTemplate.opsForValue()
        .set("RT:" + currentUser.getUserId().toString(), tokenInfo.getRefreshToken(), tokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);
//    System.out.println("sout redis val " + valueOperations.get("RT:" + currentUser.getUserId().toString()));
    int cookieMaxAge = (int) REFRESH_TOKEN_EXPIRE_TIME / 60;


    CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
    CookieUtil.addCookie(response, REFRESH_TOKEN, tokenInfo.getRefreshToken(), cookieMaxAge);

    System.out.println("sout delete and add cookie");
    System.out.println(UriComponentsBuilder.fromUriString(targetUrl) + "확인용");
    System.out.println("sout ??엥 " + UriComponentsBuilder.fromUriString(targetUrl).queryParam("token", tokenInfo.getAccessToken())
//        .queryParam("refreshToken", tokenInfo.getRefreshToken())
        .build().toUriString());

    return UriComponentsBuilder.fromUriString(targetUrl)
        .queryParam("token", tokenInfo.getAccessToken())
//        .queryParam("refreshToken", tokenInfo.getRefreshToken())
        .build().toUriString();
  }

  protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
    super.clearAuthenticationAttributes(request);

    System.out.println("sout clearAuthenticationAttributes");
    authorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
  }

  private boolean isAuthorizedRedirectUri(String uri) {
    URI clientRedirectUri = URI.create(uri);
    URI authorizedUri = URI.create("exp://192.168.0.101:19000/oauth/redirect");
    System.out.println("sout isAuthorizedRedirectUri " + uri);
    return authorizedUri.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
        && authorizedUri.getPort() == clientRedirectUri.getPort();

  }


}
