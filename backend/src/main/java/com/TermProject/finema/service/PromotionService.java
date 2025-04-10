package com.TermProject.finema.service;

import com.TermProject.finema.entity.Promotion;
import com.TermProject.finema.repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

import java.util.List;

@Service
public class PromotionService {

    @Autowired
    private PromotionRepository promotionRepository;

    public List<Promotion> getPromotionByPromotionId(int promotionId) {
        return promotionRepository.findById(promotionId);
    }

    public Promotion savePromotion(Promotion promotion) {
        return promotionRepository.save(promotion);
    }

    public List<Promotion> getAllPromotions() {
        return promotionRepository.findAll();
    }

}