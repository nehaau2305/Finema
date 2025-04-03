package com.TermProject.finema.controller;

import com.TermProject.finema.entity.Showroom;
import com.TermProject.finema.service.ShowroomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/showrooms")
@CrossOrigin(origins = "http://localhost:3000")
public class ShowroomController {

    @Autowired
    private ShowroomService showroomService;

    // Add a new showroom
    @PostMapping("/add")
    public ResponseEntity<Showroom> addShowroom(@RequestBody Showroom showroom) {
        Showroom savedShowroom = showroomService.addShowroom(showroom);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedShowroom);
    }

    // Get all showrooms
    @GetMapping("/all")
    public ResponseEntity<List<Showroom>> getAllShowrooms() {
        List<Showroom> showrooms = showroomService.getAllShowrooms();
        return ResponseEntity.ok(showrooms);
    }

    // Get showrooms by theater ID
    @GetMapping("/by-theater")
    public ResponseEntity<List<Showroom>> getShowroomsByTheater(@RequestParam int theaterId) {
        List<Showroom> showrooms = showroomService.getShowroomsByTheater(theaterId);
        return ResponseEntity.ok(showrooms);
    }

    // Update a showroom
    @PutMapping("/update/{id}")
    public ResponseEntity<Showroom> updateShowroom(@PathVariable int id, @RequestBody Showroom showroom) {
        Showroom updatedShowroom = showroomService.updateShowroom(id, showroom);
        return ResponseEntity.ok(updatedShowroom);
    }

    // Delete a showroom
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteShowroom(@PathVariable int id) {
        showroomService.deleteShowroom(id);
        return ResponseEntity.noContent().build();
    }
}