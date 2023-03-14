package com.jsdckj.ttarawa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class TtarawaApplication {

	public static void main(String[] args) {
		SpringApplication.run(TtarawaApplication.class, args);
	}

}
