package com.TermProject.finema.controller;

import com.TermProject.finema.entity.Theater;
import com.TermProject.finema.service.TheaterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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
}