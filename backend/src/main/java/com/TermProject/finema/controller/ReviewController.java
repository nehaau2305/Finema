package com.TermProject.finema.controller;

import com.TermProject.finema.entity.Review;
import com.TermProject.finema.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/review")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    // Get all reviews for a specific movie
    @GetMapping("/movie/{movieId}")
    public ResponseEntity<List<Review>> getReviewByMovieId(@PathVariable int movieId) {
        return ResponseEntity.ok(reviewService.getReviewByMovieId(movieId));
    }

    // Add new review
    @PostMapping
    public ResponseEntity<Review> addReview(@RequestBody Review review) {
        if (review.getUser() == null || review.getUser().getId() == -1) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(reviewService.saveReview(review));
    }
}