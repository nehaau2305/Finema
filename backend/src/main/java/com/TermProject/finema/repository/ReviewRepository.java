package com.TermProject.finema.repository;

import com.TermProject.finema.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findByMovieId(int movieId);

    List<Review> findByUserId(int userId);


}