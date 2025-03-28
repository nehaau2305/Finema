package com.TermProject.finema.service;

import com.TermProject.finema.entity.Theater;
import com.TermProject.finema.entity.Showroom;
import com.TermProject.finema.repository.TheaterRepository;
import com.TermProject.finema.repository.ShowroomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import java.util.Optional;

import java.util.List;

@Service
public class TheaterService {
    @Autowired
    private TheaterRepository theaterRepository;

    @Autowired
    private ShowroomRepository showroomRepository;

    public Theater addTheater(Theater theater) {

        System.out.println("Add Theater in TheaterService enterd.");
        System.out.println("numRooms: " + theater.getNumRooms());
        Theater savedTheater = theaterRepository.save(theater);
        for (int i = 1; i <= theater.getNumRooms(); i++) {
            Showroom showroom = new Showroom();
            showroom.setTheater(theater);
            showroom.setTheaterId(theater.getId());
            showroom.setRoomNumber("Room " + i);
            showroom.setCapacity(40);
            showroomRepository.save(showroom);
        }
        System.out.println("Showrooms should be created now from Add Theater in TheaterService.");
        return savedTheater;
    }

    public List<Theater> getAllTheaters() {
        return theaterRepository.findAll();
    }

    public void deleteTheater(int id) {
        theaterRepository.deleteById(id);
    }

    public List<Showroom> addShowroom(Theater theater, Showroom showroom) {
        showroom.setTheater(theater);
        showroomRepository.save(showroom);
        return showroomRepository.findByTheater(theater);
    }

    public List<Showroom> getShowrooms(Theater theater) {
        return showroomRepository.findByTheater(theater);
    }
}