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

  public static Map<String, String> toCoordinate(String location) {

    Map<String, String> result = new HashMap<>();


    try {

      location = URLEncoder.encode(location, "UTF-8");

      String url = "https://dapi.kakao.com/v2/local/search/address.json?query=" + location;

      String jsonString = new String();

      String buf;

      URL Url = new URL(url);

      HttpsURLConnection conn = (HttpsURLConnection) Url.openConnection();
      String auth = "KakaoAK " + "d7d7a42861b64d89868bc0f51679f971";
      conn.setRequestMethod("GET");
      conn.setRequestProperty("X-Requested-With", "curl");
      conn.setRequestProperty("Authorization", auth);

      BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
      while ((buf = br.readLine()) != null) {
        jsonString += buf;
      }
      JSONParser paser = new JSONParser();

      JSONObject J = null;
      J = (JSONObject) paser.parse(jsonString);

      JSONObject meta = (JSONObject) J.get("meta");

      JSONArray data = (JSONArray) J.get("documents");

      int size = (int) meta.get("total_count");
      if(size > 0) {
        JSONObject jsonX = (JSONObject) data.get(0);
        result.put("x", jsonX.get("x").toString());
        result.put("y", jsonX.get("y").toString());
        System.out.println(result.get("X"));

      }
      else{
        return null;
      }

    }catch (IOException e){
      e.printStackTrace();
    }
    catch (RuntimeException e){
      e.printStackTrace();;
    } catch (ParseException e) {
      e.printStackTrace();
    }
    return result;
  }

  private static String getCoordinate(String apiUrl) throws Exception {
    HttpURLConnection conn = null;
    StringBuffer response = new StringBuffer();

    String auth = "KakaoAK " + "d7d7a42861b64d89868bc0f51679f971";

    //URL 설정
    URL url = new URL(apiUrl);

    conn = (HttpURLConnection) url.openConnection();

    //Request 형식 설정
    conn.setRequestMethod("GET");
    conn.setRequestProperty("X-Requested-With", "curl");
    conn.setRequestProperty("Authorization", auth);

    //request에 JSON data 준비
    conn.setDoOutput(true);

    //보내고 결과값 받기
    int responseCode = conn.getResponseCode();
    if (responseCode == 400) {
      System.out.println("400:: 해당 명령을 실행할 수 없음");
    } else if (responseCode == 401) {
      System.out.println("401:: Authorization가 잘못됨");
    } else if (responseCode == 500) {
      System.out.println("500:: 서버 에러, 문의 필요");
    } else { // 성공 후 응답 JSON 데이터받기

      Charset charset = Charset.forName("UTF-8");
      BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), charset));

      String inputLine;
      while ((inputLine = br.readLine()) != null) {
        response.append(inputLine);
      }
    }

    return response.toString();
  }

}
