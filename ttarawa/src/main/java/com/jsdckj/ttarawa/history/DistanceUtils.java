package com.jsdckj.ttarawa.history;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;

import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;

public class DistanceUtils {
  private static String GEOCODE_URL="http://dapi.kakao.com/v2/local/search/address.json?query=";
  private static String GEOCODE_USER_INFO="KakaoAK 발급받은 rest api key";

  public static Long manhattanDistance(Long myTime, Long myDistance, Long historyTime, Long historyDistance){
    return Math.abs(myTime-historyTime) + Math.abs(myDistance-historyDistance);
  }

  public static double getDistance(double lat1, double lon1, double lat2, double lon2) {
    int R = 6371; // 지구 반지름 (km)

    double dLat = Math.toRadians(lat2 - lat1);
    double dLon = Math.toRadians(lon2 - lon1);
    double lat1Rad = Math.toRadians(lat1);
    double lat2Rad = Math.toRadians(lat2);

    double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
    double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    double distance = R * c * 1000; // 거리 계산 결과를 미터 단위로 변환
    return distance;
  }

}
