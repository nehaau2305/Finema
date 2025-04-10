package com.TermProject.finema.controller;

import com.TermProject.finema.entity.Promotion;
import com.TermProject.finema.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/promotion")
@CrossOrigin(origins = "http://localhost:3000")
public class PromotionController {
    @Autowired
    private PromotionService promotionService;

    // Get a specific promotion
    @GetMapping("/promotion/{promotionId}")
    public ResponseEntity<Promotion> getPromotionByPromotionId(@PathVariable int promotionId) {
        List<Promotion> promotion = promotionService.getPromotionByPromotionId(promotionId);
        if (promotion.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(promotion.get(0));
    }

    //get all promotions
    @GetMapping
    public ResponseEntity<List<Promotion>> getAllPromotions() {
        return ResponseEntity.ok(promotionService.getAllPromotions());
    }


    // Add new promotion
    @PostMapping("/add")
    public ResponseEntity<Promotion> addPromotion(@RequestBody Promotion promotion) {
        try {
            Promotion createdPromotion = promotionService.savePromotion(promotion);
            //String result = mailService.sendPromotionEmail(createdPromotion.getPromotionText());
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPromotion);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}