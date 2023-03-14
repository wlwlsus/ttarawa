package com.jsdckj.ttarawa.spot.repository;

import com.jsdckj.ttarawa.spot.entity.Spot;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SpotRepository extends JpaRepository<Spot, Long> {

  Page<Spot> findSpotsByCategoryCategoryId(Long categoryCategoryId, Pageable pageable);

  Page<Spot> findSpotsByCategoryCategoryIdNot(Long categoryCategoryId, Pageable pageable);

  Page<Spot> findAll(Pageable pageable);

  @Query(value = """
      SELECT s,
          (6371*FUNCTION('acos', FUNCTION('cos', FUNCTION('radians', :lng)) *
              FUNCTION('cos', FUNCTION('radians', s.latitude)) *
              FUNCTION('cos', FUNCTION('radians', s.longitude) -
                  FUNCTION('radians', :longitude)) +
              FUNCTION('sin', FUNCTION('radians', :lat)) *
              FUNCTION('sin', FUNCTION('radians', s.latitude))))
          AS distance)
      FROM Spot s
      WHERE distance <= 0.3
      ORDER BY distance
      """)
  Page<Spot> findSpotsByLatAndLng(@Param("s_lat") Double s_lat, @Param("s_lng") Double s_lng, @Param("e_lat") Double e_lat, @Param("e_lng") Double e_lng, Pageable pageable);

}
