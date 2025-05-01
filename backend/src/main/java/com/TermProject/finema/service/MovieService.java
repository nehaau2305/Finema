package com.TermProject.finema.service;

import com.TermProject.finema.entity.Movie;
import com.TermProject.finema.repository.MovieRepository;
import com.TermProject.finema.entity.Showtime;
import com.TermProject.finema.repository.ShowtimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import java.util.List;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ShowtimeRepository showtimeRepository;

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Optional<Movie> getMovieById(int id) {
        return movieRepository.findById(id);
    }

    public Movie addMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public Movie setNowPlaying(int movieId) {
        Optional<Movie> movie = movieRepository.findById(movieId);
        movie.get().setComingSoon(false);
        movie.get().setNowShowing(true);
        return movieRepository.save(movie.get());
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

    /**public List<Movie> getMoviesByComingSoon(Boolean coming_soon) {
        return movieRepository.findByComingSoon(coming_soon);
    }


    public List<Movie> getMoviesByNowPlaying(Boolean now_playing) {
        return movieRepository.findByNowPlaying(now_playing);
    }*/

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



    // SHOWTIME STUFF

    // for user to book tickets for future showtimes
    public List<Showtime> getShowtimes(int movieId) {
        LocalDate now = LocalDate.now();  // Get the current date and time
        return showtimeRepository.findByMovieIdAndDateGreaterThanEqual(movieId, now);
    }

    public List<Double> getTicketPricesByMovieId(int movieId) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found."));
        return Arrays.asList(movie.getChildTicketPrice(), movie.getAdultTicketPrice(), movie.getSeniorTicketPrice());
    }
}