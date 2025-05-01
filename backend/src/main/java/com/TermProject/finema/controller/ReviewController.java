package com.TermProject.finema.controller;

import com.TermProject.finema.entity.Review;
import com.TermProject.finema.entity.Movie;
import com.TermProject.finema.entity.User;
import com.TermProject.finema.repository.MovieRepository;
import com.TermProject.finema.repository.ReviewRepository;
import com.TermProject.finema.repository.UserRepository;
import com.TermProject.finema.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    // Get all reviews for a specific movie
    @GetMapping("/movie/{movieId}")
    public ResponseEntity<List<Review>> getReviewByMovieId(@PathVariable int movieId) {
        return ResponseEntity.ok(reviewService.getReviewByMovieId(movieId));
    }

    // Add a new review
    @PostMapping("/add")
    public ResponseEntity<Review> addReview(@RequestBody Map<String, Object> request) {
        int userId = (int) request.get("userId");
        int movieId = (int) request.get("movieId");
        String reviewText = (String) request.get("reviewText");
        int rating = (int) request.get("rating");

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Movie movie = movieRepository.findById(movieId).orElseThrow(() -> new RuntimeException("Movie not found"));

        Review review = new Review();
        review.setUser(user);
        review.setMovie(movie);
        review.setReviewText(reviewText);
        review.setRating(rating);

        reviewRepository.save(review);
        return ResponseEntity.ok(review);
    }
}