package com.TermProject.finema.controller;

import com.TermProject.finema.entity.Theater;
import com.TermProject.finema.service.TheaterService;
import com.TermProject.finema.entity.Showroom;
import com.TermProject.finema.entity.Showtime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.time.LocalDate;
import com.TermProject.finema.dto.AddShowtimeRequest;
import com.TermProject.finema.dto.GetShowtimeRequest;

import java.util.List;

@RestController
@RequestMapping("/theaters")
@CrossOrigin(origins = "http://localhost:3000")
public class TheaterController {
    @Autowired
    private TheaterService theaterService;

    @PostMapping("/add")
    public ResponseEntity<Theater> addTheater(@RequestBody Theater theater) {
        System.out.println("Theater Controller entered");
        Theater savedTheater = theaterService.addTheater(theater);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTheater);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Theater>> getAllTheaters() {
        List<Theater> theaters = theaterService.getAllTheaters();
        return ResponseEntity.ok(theaters);
    }

    @GetMapping("/get-showrooms")
    public ResponseEntity<List<Showroom>> getShowrooms(@RequestParam int theaterId) {
        System.out.println("getShowroom in TheaterController entered");
        List<Showroom> showrooms = theaterService.getShowrooms(theaterId);
        return ResponseEntity.ok(showrooms);
    }

    @PostMapping("/add-showtime")
    public ResponseEntity<List<Showtime>> addShowtimesByDate(@RequestBody AddShowtimeRequest request) {
        System.out.println("addShowtimesByDateAndTheater in TheaterController entered");
        Theater theater = request.getTheater();
        LocalDate date = request.getDate();
        List<Showtime> showtimes = theaterService.addShowtimesByDate(theater, date);
        return ResponseEntity.status(HttpStatus.CREATED).body(showtimes);
    }

    // lists all showtimes for given theater and date (for admin side to add movies)
    @GetMapping("/get-theater-date-showtimes")
    public ResponseEntity<List<Showtime>> getShowtimes(@RequestBody GetShowtimeRequest request) {
        System.out.println("getShowtimes entered");
        List<Showtime> showtimes = theaterService.getShowtimes(request.getTheaterId(), request.getDate());
        return ResponseEntity.ok(showtimes);
    }

    /**
    @GetMapping("/showrooms/no-movie")
    public ResponseEntity<List<Showroom>> getShowroomsWithNoMovie(@RequestBody GetShowtimeRequest request) {
        List<Showroom> showrooms = theaterService.getShowroomsWithNoMovie(request.getTheaterId(), request.getDate());
        return ResponseEntity.ok(showrooms);
    }
    */

}