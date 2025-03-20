package com.TermProject.finema.repository;

import com.TermProject.finema.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {
    List<Movie> findByTitleContainingIgnoreCase(String title);
    List<Movie> findByCategoryContainingIgnoreCase(String category);
    List<Movie> findByDirectorContainingIgnoreCase(String director);
    List<Movie> findByProducerContainingIgnoreCase(String producer);

    List<Movie> findByTitleContainingIgnoreCaseOrCategoryContainingIgnoreCaseOrDirectorContainingIgnoreCaseOrProducerContainingIgnoreCase(
        String title, String category, String director, String producer);

    List<Movie> findByNowShowingTrue();
    List<Movie> findByComingSoonTrue();
}
