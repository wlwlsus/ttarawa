package com.jsdckj.ttarawa.info.repository;

import com.jsdckj.ttarawa.info.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

  List<Category> findAll();


}
