package com.TermProject.finema.service;

import com.TermProject.finema.entity.Showroom;
import com.TermProject.finema.repository.ShowroomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShowroomService {

    @Autowired
    private ShowroomRepository showroomRepository;

    // Add a new showroom
    public Showroom addShowroom(Showroom showroom) {
        return showroomRepository.save(showroom);
    }

    // Get all showrooms
    public List<Showroom> getAllShowrooms() {
        return showroomRepository.findAll();
    }

    // Get showrooms by theater ID
    public List<Showroom> getShowroomsByTheater(int theaterId) {
        return showroomRepository.findByTheaterId(theaterId);
    }

    // Update an existing showroom
    public Showroom updateShowroom(int id, Showroom showroom) {
        Showroom existingShowroom = showroomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Showroom not found with id: " + id));
        existingShowroom.setCapacity(showroom.getCapacity());
        existingShowroom.setRoomNumber(showroom.getRoomNumber());
        existingShowroom.setTheater(showroom.getTheater());
        return showroomRepository.save(existingShowroom);
    }

    // Delete a showroom by ID
    public void deleteShowroom(int id) {
        if (!showroomRepository.existsById(id)) {
            throw new RuntimeException("Showroom not found with id: " + id);
        }
        showroomRepository.deleteById(id);
    }
}