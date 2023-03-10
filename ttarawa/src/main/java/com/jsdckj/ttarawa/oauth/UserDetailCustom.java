package com.jsdckj.ttarawa.oauth;

import com.jsdckj.ttarawa.users.entity.Users;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@Data
public class UserDetailCustom implements OAuth2User {

  private final Users users;
  private Map<String, Object> attributes;

  public UserDetailCustom(Users users) {
    this.users = users;
  }

  public UserDetailCustom(Users users, Map<String, Object> attributes) {
    this.users = users;
    this.attributes = attributes;
  }

  @Override
  public Map<String, Object> getAttributes() {
    return attributes;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    Collection<GrantedAuthority> collection = new ArrayList<>();
//    collection.add(users::getEmail);
//    collection.add(users::getProvider);
    collection.add((GrantedAuthority) () -> users.getRole().toString());

    return collection;
  }

  @Override
  public String getName() {
    return users.getNickname();
  }
}
