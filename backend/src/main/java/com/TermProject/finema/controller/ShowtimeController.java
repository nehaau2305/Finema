package com.TermProject.finema.controller;

import com.TermProject.finema.entity.Showtime;
import com.TermProject.finema.entity.Theater;
import com.TermProject.finema.service.ShowtimeService;
import com.TermProject.finema.dto.AddShowtimeRequest;
import com.TermProject.finema.dto.GetShowtimeRequest;
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

    // Add showtimes for a specific theater and date
    @PostMapping("/add")
    public ResponseEntity<List<Showtime>> addShowtimesByDate(@RequestBody AddShowtimeRequest request) {
        System.out.println("addShowtimesByDate in ShowtimeController entered");
        Theater theater = request.getTheater();
        LocalDate date = request.getDate();
        List<Showtime> showtimes = showtimeService.addShowtimesByDate(theater, date);
        return ResponseEntity.status(HttpStatus.CREATED).body(showtimes);
    }

    // Get showtimes for a specific theater and date
    @GetMapping("/get-by-theater-and-date")
    public ResponseEntity<List<Showtime>> getShowtimes(@RequestBody GetShowtimeRequest request) {
        System.out.println("getShowtimes in ShowtimeController entered");
        List<Showtime> showtimes = showtimeService.getShowtimes(request.getTheaterId(), request.getDate());
        return ResponseEntity.ok(showtimes);
    }


}