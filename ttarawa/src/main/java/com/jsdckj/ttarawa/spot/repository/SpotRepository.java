package com.jsdckj.ttarawa.spot.repository;

import com.jsdckj.ttarawa.spot.entity.Spot;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpotRepository extends JpaRepository<Spot, Long> {

  Page<Spot> findAll(Pageable pageable);
}
