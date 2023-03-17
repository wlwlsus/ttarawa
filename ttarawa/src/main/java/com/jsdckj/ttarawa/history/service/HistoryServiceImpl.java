package com.jsdckj.ttarawa.history.service;

import com.jsdckj.ttarawa.history.dto.req.HistoryReqDto;
import com.jsdckj.ttarawa.history.dto.req.HistoryUpdateReq;
import com.jsdckj.ttarawa.history.entity.History;
import com.jsdckj.ttarawa.history.repository.HistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
@RequiredArgsConstructor
public class HistoryServiceImpl implements HistoryService {

  private final HistoryRepository historyRepository;


  // 게시물 저장
  @Override
  public void insertHistory(Long userId, MultipartFile img, HistoryReqDto historyReqDto) {

    historyRepository.save(History.builder()
        .time(historyReqDto.getTime())
        .distance(historyReqDto.getDistance())
        .content(historyReqDto.getContent())
        .startAddress(historyReqDto.getStartAddress())
        .endAddress(historyReqDto.getEndAddress())
        .build());

  }

  // 게시물 수정
  @Override
  public void updateHistory(Long userId, Long historyId, HistoryUpdateReq historyUpdateReq) {

    History history = historyRepository.findById(historyId).get();
    history.updateHistory(historyUpdateReq.getPersonal(), historyUpdateReq.getContent());
  }


  // 게시물 삭제
  @Override
  public void deleteHistory(Long userId, Long historyId) {

    historyRepository.deleteByHistoryId(historyId);

  }
}