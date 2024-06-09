package com.k10b307.minsu.repository;

import com.k10b307.minsu.entity.Description;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DescRepository extends JpaRepository<Description, Long> {
    List<Description> findByArchId(Long archId);
}