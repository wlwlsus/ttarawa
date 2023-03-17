package com.jsdckj.ttarawa.history.controller;

import com.jsdckj.ttarawa.history.service.HistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/history")
@RequiredArgsConstructor
public class HistoryController {

  private final HistoryService historyService;

}