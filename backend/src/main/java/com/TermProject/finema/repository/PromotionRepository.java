package com.TermProject.finema.repository;

import com.TermProject.finema.entity.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Long> {
    Promotion findByCode(String code);
}