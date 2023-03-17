package com.jsdckj.ttarawa.history.service;

import com.jsdckj.ttarawa.history.dto.req.HistoryReqDto;
import com.jsdckj.ttarawa.history.dto.req.HistoryUpdateReq;
import com.jsdckj.ttarawa.history.entity.History;
import com.jsdckj.ttarawa.history.repository.HistoryRepository;
import com.jsdckj.ttarawa.users.entity.Users;
import com.jsdckj.ttarawa.users.entity.UsersInfo;
import com.jsdckj.ttarawa.users.repository.UserInfoRepository;
import com.jsdckj.ttarawa.users.repository.UserRepository;
import com.jsdckj.ttarawa.users.service.UserInfoService;
import com.nimbusds.openid.connect.sdk.claims.UserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
@RequiredArgsConstructor
public class HistoryServiceImpl implements HistoryService {

  private final HistoryRepository historyRepository;
  private final UserRepository userRepository;
  private final UserInfoRepository userInfoRepository;
  private final UserInfoService userInfoService;


  // 게시물 저장
  @Override
  public void insertHistory(Long userId, MultipartFile img, HistoryReqDto historyReqDto) {

    Users currentUser = userRepository.findById(userId).get(); // 현재 유저

    // 게시물 저장
    
    historyRepository.save(History.builder()
        .time(historyReqDto.getTime())
        .distance(historyReqDto.getDistance())
        .content(historyReqDto.getContent())
        .startAddress(historyReqDto.getStartAddress())
        .endAddress(historyReqDto.getEndAddress())
        .image("")
        .users(currentUser)
        .build());
    

    // 내 주행 거리 늘리기
    UsersInfo userInfo = userInfoRepository.findById(userId).get();
    Long newTotalDistance = userInfo.updateTotalDistance(historyReqDto.getDistance());

    // 뱃지 업데이트
    userInfoService.updateBadge(currentUser,newTotalDistance);



    
    // 주행 거리에 따른 뱃지 변경
  }

  // 게시물 수정
  @Override
  public boolean updateHistory(Long userId, Long historyId, HistoryUpdateReq historyUpdateReq) {



    History history = historyRepository.findById(historyId).get();

    // 나인지 확인
    if(history.getUsers()==userRepository.findById(userId).get()){
      history.updateHistory(historyUpdateReq.getPersonal(), historyUpdateReq.getContent());
      return true;

    }

    else{
      return false;
    }

  }


  // 게시물 삭제
  @Override
  public void deleteHistory(Long userId, Long historyId) {

    historyRepository.deleteByHistoryId(historyId);

  }
}