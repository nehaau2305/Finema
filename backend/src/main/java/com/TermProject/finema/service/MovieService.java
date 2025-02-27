package com.TermProject.finema.service;

import com.TermProject.finema.entity.Movie;
import com.TermProject.finema.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

import java.util.List;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Optional<Movie> getMovieById(int id) {
        return movieRepository.findById(id);
    }

    public Movie addMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public void deleteMovie(int id) {
        movieRepository.deleteById(id);
    }

    
    public List<Movie> getMoviesByTitle(String title) {
        return movieRepository.findByTitleContainingIgnoreCase(title);
    }

    public List<Movie> getMoviesByCategory(String category) {
        return movieRepository.findByCategoryContainingIgnoreCase(category);
    }

    public List<Movie> getMoviesByDirector(String director) {
        return movieRepository.findByDirectorContainingIgnoreCase(director);
    }

    public List<Movie> getMoviesByProducer(String producer) {
        return movieRepository.findByProducerContainingIgnoreCase(producer);
    }

    public List<Movie> searchMovies(String query) {
        return movieRepository.findByTitleContainingIgnoreCaseOrCategoryContainingIgnoreCaseOrDirectorContainingIgnoreCaseOrProducerContainingIgnoreCase(
            query, query, query, query);
    }

    public List<Movie> getNowShowingMovies() {
        return movieRepository.findByNowShowingTrue();
    }

    public List<Movie> getComingSoonMovies() {
        return movieRepository.findByComingSoonTrue();
    }






}