package com.jsdckj.ttarawa;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.jsdckj.ttarawa.util.Response;
import com.nimbusds.jose.shaded.gson.JsonArray;
import com.nimbusds.jose.shaded.gson.JsonElement;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.lang.reflect.Method;
import java.util.List;

@Slf4j
@Aspect
@Component
public class LogAop {

    // com.aop.controller 이하 패키지의 모든 클래스 이하 모든 메서드에 적용
    @Pointcut("execution(* *..controller.*.*(..))")
    private void cut(){}

    // Pointcut에 의해 필터링된 경로로 들어오는 경우 메서드 호출 전에 적용
    @Before("cut()")
    public void beforeParameterLog(JoinPoint joinPoint) {
        // 메서드 정보 받아오기
        Method method = getMethod(joinPoint);
        log.info("======= method name = {} =======", method.getName());

        // 파라미터 받아오기
        Object[] args = joinPoint.getArgs();
        if (args.length <= 0) log.info("no parameter");
        for (Object arg : args) {
            log.info("parameter value = {}", arg);
        }
    }

    // Poincut에 의해 필터링된 경로로 들어오는 경우 메서드 리턴 후에 적용
    @AfterReturning(value = "cut()", returning = "returnObj")
    public void afterReturnLog(JoinPoint joinPoint, Object returnObj) throws IOException {
        // 메서드 정보 받아오기
        Method method = getMethod(joinPoint);
        log.info("======= method name = {} =======", method.getName());
        log.info("return value = {}", returnObj);

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonString = objectMapper.writeValueAsString(returnObj);
        JsonNode jsonNode = objectMapper.readTree(jsonString);
        jsonNode = objectMapper.readTree(jsonNode.get("body").traverse());
        if (jsonNode.has("result")) {
            JsonNode resultNode = jsonNode.get("result");
            if (resultNode.isArray()) {
                log.info("result size = {}", resultNode.size());
            }
        }
    }

    // JoinPoint로 메서드 정보 가져오기
    private Method getMethod(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        return signature.getMethod();
    }
}