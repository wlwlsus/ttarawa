package com.jsdckj.ttarawa.info.service;

import com.jsdckj.ttarawa.info.entity.Category;
import com.jsdckj.ttarawa.info.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class InfoServiceImpl implements InfoService {

  private final CategoryRepository categoryRepository;

  @Override
  public List<Category> getCategories() {
    return categoryRepository.findAll();
  }
}
