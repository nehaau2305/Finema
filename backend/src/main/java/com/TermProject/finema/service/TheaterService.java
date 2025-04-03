package com.TermProject.finema.service;

import com.TermProject.finema.entity.Theater;
import com.TermProject.finema.entity.Showroom;
import com.TermProject.finema.entity.Seat;
import com.TermProject.finema.entity.Showtime;
import com.TermProject.finema.entity.ConsecutiveTimes;
import com.TermProject.finema.repository.TheaterRepository;
import com.TermProject.finema.repository.ShowroomRepository;
import com.TermProject.finema.repository.SeatRepository;
import com.TermProject.finema.repository.ShowtimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.time.LocalDate;

import java.util.ArrayList;
import java.util.List;

@Service
public class TheaterService {
    @Autowired
    private TheaterRepository theaterRepository;

    @Autowired
    private ShowroomRepository showroomRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private ShowtimeRepository showtimeRepository;

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
            for (int j = 1; j <= showroom.getCapacity(); j++) {
                Seat seat = new Seat();
                seat.setShowroomID(showroom.getId());
                seat.setShowroom(showroom);
                seat.setSeatNum(j);
                seat.setReserved(false);
                seatRepository.save(seat);
            } // create capacity seats per showroom
        } // create # showrooms per theater
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

    public List<Showroom> getShowrooms(int theaterId) {
        return showroomRepository.findByTheaterId(theaterId);
    }

    public List<Showtime> addShowtimesByDate(Theater theater, LocalDate date) {
        List<Showroom> showrooms = showroomRepository.findByTheater(theater);
        List<Showtime> addedShowtimes = new ArrayList<>();
        for (Showroom showroom : showrooms) {
            for (ConsecutiveTimes time : ConsecutiveTimes.values()) {
                Showtime showtime = new Showtime();
                showtime.setShowroomId(showroom.getId());
                showtime.setShowroom(showroom);
                showtime.setDate(date);
                showtime.setTime(time);
                showtimeRepository.save(showtime);
                addedShowtimes.add(showtime);
            } // add every showtime for the given date
        } // for each showroom in the theater
        return addedShowtimes;
    }


}