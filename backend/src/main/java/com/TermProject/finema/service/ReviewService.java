package com.TermProject.finema.service;

import com.TermProject.finema.entity.Review;
import com.TermProject.finema.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getReviewByMovieId(int movieId) {
        return reviewRepository.findByMovieId(movieId);
    }

    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }
}