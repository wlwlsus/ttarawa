package com.jsdckj.ttarawa.users.service;

import com.jsdckj.ttarawa.file.service.FileService;
import com.jsdckj.ttarawa.jwt.JwtTokenProvider;
import com.jsdckj.ttarawa.jwt.JwtUtil;
import com.jsdckj.ttarawa.users.dto.req.UserReqDto;
import com.jsdckj.ttarawa.users.dto.res.UserInfoResDto;
import com.jsdckj.ttarawa.users.dto.res.UserResDto;
import com.jsdckj.ttarawa.users.entity.Users;
import com.jsdckj.ttarawa.users.entity.UsersInfo;
import com.jsdckj.ttarawa.users.repository.UserInfoRepository;
import com.jsdckj.ttarawa.users.repository.UserRepository;
import com.jsdckj.ttarawa.util.CookieUtil;
import com.jsdckj.ttarawa.util.Response;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import static com.jsdckj.ttarawa.jwt.JwtProperties.REFRESH_TOKEN_EXPIRE_TIME;
import static com.jsdckj.ttarawa.oauth.OAuth2AuthorizationRequestBasedOnCookieRepository.REFRESH_TOKEN;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    @Value("${jwt.secret}")
    private String secretKey;

    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate<String, String> redisTemplate;

    private final UserRepository userRepository;
    private final UserInfoRepository userInfoRepository;
    private final FileService fileService;
    private final JwtUtil jwtUtil;
    public final static String REFRESH_TOKEN = "refresh_token";
    int cookieMaxAge = (int) REFRESH_TOKEN_EXPIRE_TIME / 60;



    @Override
    public ResponseEntity<?> reissue(UserReqDto.Reissue reissue, HttpServletRequest request, HttpServletResponse response) {

        // 1. Refresh Token 검증
        if (!jwtTokenProvider.validateToken(redisTemplate.opsForValue().get("RT:"+reissue.getAccessToken()))) {
            return Response.badRequest("Refresh Token 정보가 유효하지 않습니다");
        }


        // 2. Access Token에서 정보 가져오기 <????
        Authentication authentication = jwtTokenProvider.getAuthentication(reissue.getAccessToken());

        Long userId = jwtUtil.getUserIdAtService(reissue.getAccessToken());

        //3. Redis 에서 User id를 기반으로 저장된 Refresh Token 값을 가져온다
        String refreshToken = redisTemplate.opsForValue().get("RT:"+reissue.getAccessToken());

        // 로그아웃 되어 Redis에 refresh token이 존재하지 않는 경우 처리
        if (ObjectUtils.isEmpty(refreshToken)) {
            return Response.badRequest("잘못된 요청입니다");
        }


        // 4. 새로운 토큰 생성
        UserResDto.TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication, userId);

        redisTemplate.opsForValue()
                .set("RT:" + tokenInfo.getAccessToken(), tokenInfo.getRefreshToken(), tokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);
        System.out.println("sout refresh token reissue "+tokenInfo.getRefreshToken());
        CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
        CookieUtil.addCookie(response, REFRESH_TOKEN, tokenInfo.getRefreshToken(), cookieMaxAge);
        return Response.makeResponse(HttpStatus.OK,"Token 재발급 성공", tokenInfo);
    }

    @Override
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response, UserReqDto.Logout logout) {

        // 1. Access Token 검증
        if (!jwtTokenProvider.validateToken(logout.getAccessToken())) {
            return Response.badRequest("잘못된 요청입니다");
        }

        // 2. Access Token에서 user
        Authentication authentication = jwtTokenProvider.getAuthentication(logout.getAccessToken());
        Long userId = jwtUtil.getUserIdAtService(logout.getAccessToken());

//        Long userIdInAccessToken =
        if (redisTemplate.opsForValue().get("RT:" +logout.getAccessToken()) != null) {
            // Refresh Token 삭제
            redisTemplate.delete("RT:" +logout.getAccessToken());
        }

        // 4. 해당 Access Token 유효시간 가지고 와서 BlackList 로 저장하기
        Long expiration = jwtTokenProvider.getExpiration(logout.getAccessToken());
//        refreshTokenRepository.logout(logout.getAccessToken(), expiration);
        redisTemplate.opsForValue()
                .set(logout.getAccessToken(), "logout", expiration, TimeUnit.MILLISECONDS);

//        refreshTokenRepository.save();
        CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);



        return Response.ok("로그아웃 성공");
    }

    // 내 정보 반환
    @Override
    public UserInfoResDto getUserInfo(Long userId) {

        Users user = userRepository.findById(userId).orElseThrow();
        UsersInfo usersInfo = userInfoRepository.findByUsers(user);

        UserInfoResDto userInfoResDto = UserInfoResDto.builder()
                .nickname(user.getNickname())
                .profile(user.getProfile())
                .badgeName(usersInfo.getBadge().getName())
                .totalDistance(usersInfo.getTotalDistance())
                .badgeImg(usersInfo.getBadge().getImage())
                .build();

        return userInfoResDto;
    }

    @Override
    public void updateNickname(Long userId, String nickname) {
        Users user = userRepository.findById(userId).get();
        user.updateUserNickname(nickname);
    }

    @Override
    public void updateProfile(Long userId, MultipartFile multipartFile) throws IOException {
        Users currentUser = userRepository.findById(userId).get();
        String currentProfile = currentUser.getProfile();
        System.out.println(currentProfile);

        if(currentProfile!=null && currentProfile.startsWith("https://ttarawa-bucket.s3.ap-northeast-2.amazonaws.com")){
            fileService.deleteFile("profile", currentProfile);
        }

        String url = fileService.uploadFile("profile", multipartFile);
        currentUser.updateUserProfile(url);
    }

    @Override
    public void deleteProfile(Long userId) {
        Users currentUser = userRepository.findById(userId).get();
        String currentProfile = currentUser.getProfile();

        if(currentProfile!=null && currentProfile.startsWith("https://ttarawa-bucket.s3.ap-northeast-2.amazonaws.com")){
            fileService.deleteFile("profile", currentProfile);
        }

        currentUser.updateUserProfile(null);
    }


}
