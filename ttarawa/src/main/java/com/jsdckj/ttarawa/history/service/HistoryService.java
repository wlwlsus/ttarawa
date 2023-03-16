package com.jsdckj.ttarawa.history.service;

import com.jsdckj.ttarawa.history.dto.req.HistoryReqDto;
import com.jsdckj.ttarawa.history.dto.req.HistoryUpdateReq;
import org.springframework.web.multipart.MultipartFile;

public interface HistoryService {
    
    // 게시물 저장
    void insertHistory(Long userId, MultipartFile img, HistoryReqDto historyReqDto);

    // 게시물 수정
    void updateHistory(Long userId, Long historyId, HistoryUpdateReq historyUpdateReq);


    // 게시물 삭제
    void deleteHistory(Long userId, Long historyId);
}
