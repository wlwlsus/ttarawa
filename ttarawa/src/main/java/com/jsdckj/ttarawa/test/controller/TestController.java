package com.jsdckj.ttarawa.test.controller;

import com.jsdckj.ttarawa.util.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping("/api/v1/test")
@RequiredArgsConstructor
@RestController
public class TestController {

    @GetMapping
    public ResponseEntity<?> getLogs(@RequestBody String message){
        log.debug(message);
        return Response.ok(message);
    }

}
