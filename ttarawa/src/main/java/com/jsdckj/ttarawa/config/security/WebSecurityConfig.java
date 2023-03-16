package com.jsdckj.ttarawa.config.security;

import com.jsdckj.ttarawa.jwt.JwtAuthenticationFilter;
import com.jsdckj.ttarawa.jwt.JwtExceptionFilter;
import com.jsdckj.ttarawa.jwt.JwtTokenProvider;
import com.jsdckj.ttarawa.oauth.CustomOAuth2AuthorizationRequestRepository;
import com.jsdckj.ttarawa.oauth.CustomOAuth2UserService;
import com.jsdckj.ttarawa.oauth.OAuth2AuthorizationRequestBasedOnCookieRepository;
import com.jsdckj.ttarawa.oauth.handler.OAuth2FailureHandler;
import com.jsdckj.ttarawa.oauth.handler.OAuth2SuccessHandler;
import com.jsdckj.ttarawa.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class WebSecurityConfig {

  private final JwtTokenProvider jwtTokenProvider;
//    private final CorsConfig corsConfig;
  private final RedisTemplate<String, String> redisTemplate;

  private final CustomOAuth2UserService customOAuth2UserService;
  private final UserRepository userRepository;


  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

    http
//        .addFilter(corsConfig.corsFilter()); // cors 설정
        .cors()
        .configurationSource(corsConfigurationSource());
    http
        .formLogin().disable() // 기본 로그인 화면 비활성화
        .httpBasic().disable() // spring security form 로그인 화면 비활성화
        .csrf().disable() // rest api 서버 이용시 csrf 보안 사용 x

        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션 사용하지 않으므로 STATELESS로 설정
        .and()
        //== URL별 권한 관리 옵션 ==//
        .authorizeRequests()
        .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
        .requestMatchers("/swagger-ui/**", "/swagger-resources/", "/**", "/favicon.ico").permitAll()
//        .requestMatchers("/login/**","/auth/**", "/oauth2/**").permitAll()
        .requestMatchers("/**").permitAll()
//        .requestMatchers("/oauth/**")
        .anyRequest().authenticated();

    http
        .oauth2Login()
        .authorizationEndpoint()
        .baseUri("/oauth2/authorization")
        .authorizationRequestRepository(oAuth2AuthorizationRequestBasedOnCookieRepository())

        .and()
        .redirectionEndpoint()
        .baseUri("/*/oauth2/code/*")
        .and()
        .userInfoEndpoint()
        .userService(customOAuth2UserService)
        .and()
        .successHandler(oAuth2SuccessHandler())
        .failureHandler(oAuth2FailureHandler());

    http
        .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
        .addFilterBefore(new JwtExceptionFilter(), JwtAuthenticationFilter.class);


    return http.build();
  }


  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
      throws Exception {
    return authenticationConfiguration.getAuthenticationManager();
  }

  @Bean
  public BCryptPasswordEncoder bCryptPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public JwtAuthenticationFilter jwtAuthenticationFilter() {
    return new JwtAuthenticationFilter(
        jwtTokenProvider, redisTemplate
    );
  }

  @Bean
  public OAuth2AuthorizationRequestBasedOnCookieRepository oAuth2AuthorizationRequestBasedOnCookieRepository() {
    return new OAuth2AuthorizationRequestBasedOnCookieRepository();
  }



  @Bean
  public OAuth2SuccessHandler oAuth2SuccessHandler() {
    return new OAuth2SuccessHandler(
        oAuth2AuthorizationRequestBasedOnCookieRepository(),
        jwtTokenProvider,
        redisTemplate,
        userRepository
    );
  }

  @Bean
  public OAuth2FailureHandler oAuth2FailureHandler() {
    return new OAuth2FailureHandler(
        oAuth2AuthorizationRequestBasedOnCookieRepository()
    );
  }


  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();

    configuration.addAllowedOriginPattern("*");
    configuration.addAllowedHeader("*");
    configuration.addAllowedMethod("*");
    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

}
