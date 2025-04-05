package com.TermProject.finema.controller;

import com.TermProject.finema.entity.Showtime;
import com.TermProject.finema.service.ShowtimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<List<Showtime>> getShowtimes(@RequestBody LocalDate date) {
        System.out.println("getShowtimes in ShowtimeController entered");
        List<Showtime> showtimes = showtimeService.getShowtimes(date);
        return ResponseEntity.ok(showtimes);
    }
}