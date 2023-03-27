package com.jsdckj.ttarawa.config.redis;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.data.redis.RedisProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.StringRedisSerializer;


@Configuration
public class RedisRepositoryConfig {

  private String redisHost;
  private int redisPort;
  private String redisPassword;

  public RedisRepositoryConfig(@Value("${spring.data.redis.host}") String redisHost,
                     @Value("${spring.data.redis.port}") int redisPort, @Value("${spring.data.redis.password}")String redisPassword) {
    this.redisHost = redisHost;
    this.redisPort = redisPort;
    this.redisPassword = redisPassword;
  }

  @Bean
  public RedisConnectionFactory redisConnectionFactory() {
    LettuceConnectionFactory lettuceConnectionFactory = new LettuceConnectionFactory();
    lettuceConnectionFactory.setHostName(redisHost);
    lettuceConnectionFactory.setPort(redisPort);
    lettuceConnectionFactory.setPassword(redisPassword);
    return lettuceConnectionFactory;
  }

  @Bean
  public RedisTemplate<?, ?> redisTemplate() {
    RedisTemplate<byte[], byte[]> redisTemplate = new RedisTemplate<>();
    redisTemplate.setConnectionFactory(redisConnectionFactory());
    return redisTemplate;
  }
}