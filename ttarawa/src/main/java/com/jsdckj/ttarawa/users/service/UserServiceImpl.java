package com.jsdckj.ttarawa.users.service;


import com.jsdckj.ttarawa.file.service.FileUploadService;
import com.jsdckj.ttarawa.jwt.JwtTokenProvider;
import com.jsdckj.ttarawa.jwt.JwtUtil;
import com.jsdckj.ttarawa.users.dto.req.UserReqDto;
import com.jsdckj.ttarawa.users.dto.res.UserInfoResDto;
import com.jsdckj.ttarawa.users.dto.res.UserResDto;
import com.jsdckj.ttarawa.users.entity.Users;
import com.jsdckj.ttarawa.users.entity.UsersInfo;
import com.jsdckj.ttarawa.users.repository.UserInfoRepository;
import com.jsdckj.ttarawa.users.repository.UserRepository;
import com.jsdckj.ttarawa.util.Response;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

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
    private final FileUploadService fileUploadService;
    private final JwtUtil jwtUtil;


    @Override
    public ResponseEntity<?> reissue(UserReqDto.Reissue reissue) {

        // 1. Refresh Token 검증
        if (!jwtTokenProvider.validateToken(reissue.getRefreshToken())) {
            return Response.badRequest("Refresh Token 정보가 유효하지 않습니다");
        }


        // 2. Access Token에서 정보 가져오기 <????
        Authentication authentication = jwtTokenProvider.getAuthentication(reissue.getAccessToken());

        Long userId = jwtUtil.getUserIdAtService(reissue.getAccessToken());

        //3. Redis 에서 User email 을 기반으로 저장된 Refresh Token 값을 가져온다
        String refreshToken = redisTemplate.opsForValue().get("RT:" + userId.toString());

        // 로그아웃 되어 Redis에 refresh token이 존재하지 않는 경우 처리
        if (ObjectUtils.isEmpty(refreshToken)) {
            return Response.badRequest("잘못된 요청입니다");
        }
        if (!refreshToken.equals(reissue.getRefreshToken())) {
            return Response.badRequest("Refresh Token 정보가 일치하지 않습니다");
        }



        // 4. 새로운 토큰 생성
        UserResDto.TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication, userId);

        redisTemplate.opsForValue()
                .set("RT:" + userId, tokenInfo.getRefreshToken(), tokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);
        System.out.println("sout refresh token reissue "+tokenInfo.getRefreshToken());
        return Response.makeResponse(HttpStatus.OK,"Token 재발급 성공", tokenInfo);
    }

    @Override
    public ResponseEntity<?> logout(UserReqDto.Logout logout) {

        // 1. Access Token 검증
        if (!jwtTokenProvider.validateToken(logout.getAccessToken())) {
            return Response.badRequest("잘못된 요청입니다");
        }

        // 2. Access Token에서 user
        Authentication authentication = jwtTokenProvider.getAuthentication(logout.getAccessToken());
        Long userId = jwtUtil.getUserIdAtService(logout.getAccessToken());

//        Long userIdInAccessToken =
        if (redisTemplate.opsForValue().get("RT:" + userId.toString()) != null) {
            // Refresh Token 삭제
            redisTemplate.delete("RT:" + userId.toString());
        }

        // 4. 해당 Access Token 유효시간 가지고 와서 BlackList 로 저장하기
        Long expiration = jwtTokenProvider.getExpiration(logout.getAccessToken());
        redisTemplate.opsForValue()
                .set(logout.getAccessToken(), "logout", expiration, TimeUnit.MILLISECONDS);

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
        String url = fileUploadService.uploadFile("profile", multipartFile);
        currentUser.updateUserProfile(url);
    }


}
