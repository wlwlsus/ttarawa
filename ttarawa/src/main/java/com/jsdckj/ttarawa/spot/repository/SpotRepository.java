package com.jsdckj.ttarawa.spot.repository;

import com.jsdckj.ttarawa.spot.entity.Spot;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SpotRepository extends JpaRepository<Spot, Long> {

  @Query(value = """
      SELECT s
      FROM Spot s
      WHERE (s.category.categoryId = :categoryId) and (6371*FUNCTION('acos',
          FUNCTION('cos', FUNCTION('radians', :s_lat))
          * FUNCTION('cos', FUNCTION('radians', s.lat))
          * FUNCTION('cos', FUNCTION('radians', s.lng) - FUNCTION('radians', :s_lng))
          + FUNCTION('sin', FUNCTION('radians', :s_lat))
          * FUNCTION('sin', FUNCTION('radians', s.lat)))) < 1
          
      """)
  Page<Spot> findSpotsByLatAndLngAndCategoryCategoryId(@Param("s_lat") Double s_lat, @Param("s_lng") Double s_lng, @Param("categoryId") Long categoryId, Pageable pageable);

  @Query(value = """
      SELECT s
      FROM Spot s
      WHERE (s.category.categoryId != :categoryId) and (6371*FUNCTION('acos',
          FUNCTION('cos', FUNCTION('radians', :s_lat))
          * FUNCTION('cos', FUNCTION('radians', s.lat))
          * FUNCTION('cos', FUNCTION('radians', s.lng) - FUNCTION('radians', :s_lng))
          + FUNCTION('sin', FUNCTION('radians', :s_lat))
          * FUNCTION('sin', FUNCTION('radians', s.lat)))) < 1
      """)
  Page<Spot> findSpotsByLatAndLngAndCategoryCategoryIdNot(@Param("s_lat") Double s_lat, @Param("s_lng") Double s_lng, @Param("categoryId") Long categoryId, Pageable pageable);

  Page<Spot> findAll(Pageable pageable);

  @Query(value = """
      SELECT s
      FROM Spot s
      WHERE (6371*FUNCTION('acos',
          FUNCTION('cos', FUNCTION('radians', :s_lat))
          * FUNCTION('cos', FUNCTION('radians', s.lat))
          * FUNCTION('cos', FUNCTION('radians', s.lng) - FUNCTION('radians', :s_lng))
          + FUNCTION('sin', FUNCTION('radians', :s_lat))
          * FUNCTION('sin', FUNCTION('radians', s.lat)))) < 1
      """)
  Page<Spot> findSpotsByLatAndLng(@Param("s_lat") Double s_lat, @Param("s_lng") Double s_lng, Pageable pageable);

}