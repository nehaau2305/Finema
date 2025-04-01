package com.TermProject.finema.controller;

import com.TermProject.finema.entity.Movie;
import com.TermProject.finema.service.MovieService;
import com.TermProject.finema.entity.Showtime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = "http://localhost:3000")
public class MovieController {
    @Autowired
    private MovieService movieService;


    @PostMapping("/add")
    public ResponseEntity<Movie> addMovie(@RequestBody Movie movie) {
        Movie savedMovie = movieService.addMovie(movie);        
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMovie);
    }


    @GetMapping("/all")
    public ResponseEntity<List<Movie>> getAllMovies() {
        List<Movie> movies = movieService.getAllMovies();
        return ResponseEntity.ok(movies);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable int id) {
        Movie movie = movieService.getMovieById(id).orElse(null);
        if (movie == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(movie);
    }

    
    @GetMapping("/search/title")
    public ResponseEntity<List<Movie>> searchMoviesByTitle(@RequestParam String title) {
        List<Movie> movies = movieService.getMoviesByTitle(title);
        return ResponseEntity.ok(movies);
    }

    @GetMapping("/search/category")
    public ResponseEntity<List<Movie>> searchMoviesByCategory(@RequestParam String category) {
        List<Movie> movies = movieService.getMoviesByCategory(category);
        return ResponseEntity.ok(movies);
    }

    @GetMapping("/search/director")
    public ResponseEntity<List<Movie>> searchMoviesByDirector(@RequestParam String director) {
        List<Movie> movies = movieService.getMoviesByDirector(director);
        return ResponseEntity.ok(movies);
    }

    @GetMapping("/search/producer")
    public ResponseEntity<List<Movie>> searchMoviesByProducer(@RequestParam String producer) {
        List<Movie> movies = movieService.getMoviesByProducer(producer);
        return ResponseEntity.ok(movies);
    }
    /**
    @GetMapping("/search/comingsoon")
    public ResponseEntity<List<Movie>> searchMoviesByComingSoon(@RequestParam Boolean soon) {
        List<Movie> movies = movieService.getMoviesByComingSoon(soon);
        return ResponseEntity.ok(movies);
    }

    @GetMapping("/search/nowplaying")
    public ResponseEntity<List<Movie>> searchMoviesByNowPlaying(@RequestParam Boolean now) {
        List<Movie> movies = movieService.getMoviesByComingSoon(now);
        return ResponseEntity.ok(movies);
    }
    */

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable int id) {
        movieService.deleteMovie(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Movie>> searchMovies(@RequestParam String query) {
        List<Movie> movies = movieService.searchMovies(query);
        System.out.println(movies);
        System.out.println(query);
        System.out.println("searching");
        System.out.println("searching");
        return ResponseEntity.ok(movies);
    }


    @GetMapping("/now-showing")
    public List<Movie> getNowShowingMovies() {
        return movieService.getNowShowingMovies();
    }

    @GetMapping("/coming-soon")
    public List<Movie> getComingSoonMovies() {
        return movieService.getComingSoonMovies();
    }

    @GetMapping("/category")
    public ResponseEntity<List<Movie>> getMoviesByCategory(@RequestParam String category) {
        List<Movie> movies = movieService.getMoviesByCategory(category);
        if (movies.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(movies);
    }


    // SHOWTIME STUFF
    @PostMapping("/add-showtime")
    public ResponseEntity<Showtime> addShowtime(@RequestBody Showtime showtime) {
        System.out.println("addShowtime entered");
        // need to send in Showtime with (movieId, showroomId, date, time)
        // date: "YYYY-MM-DD"
        // time: "HH:MM:SS"
        Showtime savedShowtime = movieService.addShowtime(showtime);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedShowtime);
    }

    @PostMapping("/get-showtimes")
    public List<Showtime> getShowtimes(@RequestBody Movie movie) {
        System.out.println("getShowtimes entered");
        return movieService.getShowtimes(movie);
    }

}