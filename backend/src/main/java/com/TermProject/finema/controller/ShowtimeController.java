package com.TermProject.finema.controller;

import com.TermProject.finema.entity.Showtime;
import com.TermProject.finema.entity.Showroom;
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
    public ResponseEntity<List<Showtime>> getShowtimes(@RequestBody LocalDate date) {
        System.out.println("getShowtimes in ShowtimeController entered");
        List<Showtime> showtimes = showtimeService.getShowtimes(date);
        return ResponseEntity.ok(showtimes);
    }

    // for admin to see available showrooms to schedule movies
    @GetMapping("/available-showrooms")
    public ResponseEntity<Map<ConsecutiveTimes, List<Showroom>>> getAvailableShowrooms(
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        //System.out.println("available showrooms entered");
        Map<ConsecutiveTimes, List<Showroom>> availableShowrooms = showtimeService.getAvailableShowroomsByTime(date);
        // System.out.println("Available Showrooms by Time:");
        // availableShowrooms.forEach((time, showrooms) -> {
        //     System.out.println("Time: " + time);
        //     showrooms.forEach(showroom -> {
        //         System.out.println("Showroom ID: " + showroom.getId());
        //     });
        // });
        return ResponseEntity.ok(availableShowrooms);
    }
}