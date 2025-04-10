package com.TermProject.finema.controller;

import com.TermProject.finema.entity.Promotion;
import com.TermProject.finema.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/promotions")
public class PromotionController {

    @Autowired
    private PromotionService promotionService;

    @PostMapping
    public ResponseEntity<Promotion> addPromotion(@RequestBody Promotion promotion) {
        Promotion savedPromotion = promotionService.addPromotion(promotion);
        return ResponseEntity.ok(savedPromotion);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePromotion(@PathVariable Long id) {
        promotionService.deletePromotion(id);
        return ResponseEntity.noContent().build();
    }
}