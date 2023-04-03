package com.jsdckj.ttarawa.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.util.SerializationUtils;

import java.util.Base64;
import java.util.Optional;

public class CookieUtil {

  public static Optional<Cookie> getCookie(HttpServletRequest request, String name) {
    Cookie[] cookies = request.getCookies();

//    System.out.println("getcookie");

    if (cookies != null && cookies.length > 0) {
      for (Cookie cookie : cookies) {
        if (name.equals(cookie.getName())) {
          return Optional.of(cookie);
        }
      }
    }
    return Optional.empty();
  }

  public static void addCookie(HttpServletResponse response, String name, String value, int maxAge) {
    Cookie cookie = new Cookie(name, value);
    cookie.setPath("/");
    cookie.setHttpOnly(true);
    cookie.setMaxAge(maxAge);
//    System.out.println("addcookie");
//    System.out.println("sout addcookie name " + cookie.getName());
    response.addCookie(cookie);
  }

  public static void deleteCookie(HttpServletRequest request, HttpServletResponse response, String name) {
    Cookie[] cookies = request.getCookies();


    if (cookies != null && cookies.length > 0) {
//      System.out.println("sout delete 쿠키1");
      for (Cookie cookie : cookies) {
//        System.out.println("sout delete cookie name "+ name);
//        System.out.println("sout delete 쿠키2 "+cookie.getName());

        if (name.equals(cookie.getName())) {
//          System.out.println("sout delete 쿠키2 이름 일치 "+cookie.getName());

          cookie.setValue("");
          cookie.setPath("/");
          cookie.setMaxAge(0);
          response.addCookie(cookie);
        }
      }
    }
  }

  public static String serialize(Object obj) {
    return Base64.getUrlEncoder()
        .encodeToString(SerializationUtils.serialize(obj));
  }

  public static <T> T deserialize(Cookie cookie, Class<T> cls) {
    return cls.cast(
        SerializationUtils.deserialize(
            Base64.getUrlDecoder().decode(cookie.getValue())
        )
    );
  }


//  public static <T> T deserializeRefreshToken(Cookie cookie, Class<T> cls) {
//    String encodedValue = cookie.getValue().replace(".", "-"); // "." 문자를 "-" 문자로 치환하여 Base64 디코딩할 수 있는 문자열로 변환
//    byte[] decodedBytes = Base64.getUrlDecoder().decode(encodedValue); // Base64 디코딩
//    return cls.cast(SerializationUtils.deserialize(decodedBytes));
//  }
//



}