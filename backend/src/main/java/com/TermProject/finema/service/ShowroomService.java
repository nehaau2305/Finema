package com.TermProject.finema.service;

import com.TermProject.finema.entity.Showroom;
import com.TermProject.finema.repository.ShowroomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;

import java.util.List;

@Service
public class ShowroomService {

    @Autowired
    private ShowroomRepository showroomRepository;


    // automatically create 6 showrooms
    @PostConstruct
    public void createDefaultShowrooms() {
        boolean showroomExists = showroomRepository.existsById(1);
        if(showroomExists == false) {
            for (int i = 1; i <= 6; i++) {
                Showroom showroom = new Showroom();
                showroom.setRoomNumber("Room " + i);
                showroom.setCapacity(56);
                showroomRepository.save(showroom);
                System.out.println("Default showrooms have been created.");
            }
        } else {
            System.out.println("Default showrooms already exist.");
        }
    }

    // Add a new showroom
    public Showroom addShowroom(Showroom showroom) {
        return showroomRepository.save(showroom);
    }

    // Get all showrooms
    public List<Showroom> getAllShowrooms() {
        return showroomRepository.findAll();
    }

    // Update an existing showroom
    public Showroom updateShowroom(int id, Showroom showroom) {
        Showroom existingShowroom = showroomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Showroom not found with id: " + id));
        existingShowroom.setCapacity(showroom.getCapacity());
        existingShowroom.setRoomNumber(showroom.getRoomNumber());
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