package com.TermProject.finema.controller;

import com.TermProject.finema.entity.Showtime;
import com.TermProject.finema.entity.Showroom;
import com.TermProject.finema.entity.Seat;
import com.TermProject.finema.service.ShowtimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.TermProject.finema.entity.ConsecutiveTimes;
import java.util.Map;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/showtimes")
@CrossOrigin(origins = "http://localhost:3000")
public class ShowtimeController {

    @Autowired
    private ShowtimeService showtimeService;

    // Add showtimes for a specific date
    @PostMapping("/add")
    public ResponseEntity<List<Showtime>> addShowtimesByDate(@RequestBody LocalDate date) {
        System.out.println("addShowtimesByDate in ShowtimeController entered");
        List<Showtime> showtimes = showtimeService.addShowtimesByDate(date);
        return ResponseEntity.status(HttpStatus.CREATED).body(showtimes);
    }

    // Get showtimes for a specific date
        @GetMapping("/get-by-date")
    public ResponseEntity<List<Showtime>> getShowtimes(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        System.out.println("getShowtimes in ShowtimeController entered with date: " + date);
        List<Showtime> showtimes = showtimeService.getShowtimes(date);
        return ResponseEntity.ok(showtimes);
    }

    // Get upcoming showtimes for a specific movie ID
    @GetMapping("/get-upcoming-by-movie/{movieId}")
    public ResponseEntity<List<Showtime>> getUpcomingShowtimesByMovieId(
            @PathVariable int movieId,
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<Showtime> showtimes = showtimeService.getUpcomingShowtimesByMovieId(movieId, date);
        return ResponseEntity.ok(showtimes);
    }

    // for admin to see available showrooms to schedule movies
    @GetMapping("/available-showrooms")
    public ResponseEntity<Map<ConsecutiveTimes, List<Showroom>>> getAvailableShowrooms(
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        Map<ConsecutiveTimes, List<Showroom>> availableShowrooms = showtimeService.getAvailableShowroomsByTime(date);
        return ResponseEntity.ok(availableShowrooms);
    }

    // get current seats for a showtime
    @GetMapping("/showtime-seats/{showtimeId}")
    public ResponseEntity<List<Seat>> getSeats(@PathVariable int showtimeId) {
        List<Seat> seats = showtimeService.getSeatByShowroomId(showtimeId);
        System.out.println(showtimeId);
        return ResponseEntity.ok(seats);
    }

    // reserve seats for a showtime
    @PutMapping("/reserve-seats/{showtimeId}")
    public ResponseEntity<List<Seat>> reserveSeats(@PathVariable int showtimeId, @RequestBody Seat[] seats) {
        showtimeService.reserveSeatsForShowtime(showtimeId, seats);
        List<Seat> newSeats = showtimeService.getSeatByShowroomId(showtimeId);
        return ResponseEntity.ok(newSeats);
    }

    // schedule a movie to a selected showtime and showroom
    @PostMapping ("/schedule-movie")
    public ResponseEntity<Showtime> scheduleMovie(@RequestBody Showtime showtime) {
        Showtime scheduledShowtime = showtimeService.scheduleMovie(showtime);
        return ResponseEntity.ok(scheduledShowtime);
    }
}