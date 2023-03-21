package com.jsdckj.ttarawa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TtarawaApplication {

  static {
    System.setProperty("com.amazonaws.sdk.disableEc2Metadata", "true");
  }

  public static void main(String[] args) {
    SpringApplication.run(TtarawaApplication.class, args);
  }

}
