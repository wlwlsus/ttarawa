package com.jsdckj.ttarawa.history.service;

import com.jsdckj.ttarawa.history.dto.req.HistoryReqDto;
import com.jsdckj.ttarawa.history.dto.req.HistoryUpdateReq;
import com.jsdckj.ttarawa.history.dto.res.HistoryResDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface HistoryService {

  // 게시물 저장
  void insertHistory(Long userId, MultipartFile img, HistoryReqDto historyReqDto);

  HistoryResDto selectOneHistory(Long userId, Long historyId);

  List<HistoryResDto> selectAllHistory(Long userId, String sortBy, int page);

  // 게시물 수정
  boolean updateHistory(Long userId, Long historyId, HistoryUpdateReq historyUpdateReq);


  // 게시물 삭제
  void deleteHistory(Long userId, Long historyId);

}