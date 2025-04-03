package com.TermProject.finema.service;

import com.TermProject.finema.entity.Showtime;
import com.TermProject.finema.entity.Showroom;
import com.TermProject.finema.entity.Theater;
import com.TermProject.finema.entity.ConsecutiveTimes;
import com.TermProject.finema.repository.ShowtimeRepository;
import com.TermProject.finema.repository.ShowroomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ShowtimeService {

    @Autowired
    private ShowtimeRepository showtimeRepository;

    @Autowired
    private ShowroomRepository showroomRepository;

    // Add showtimes for a specific theater and date
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
            }
        }
        return addedShowtimes;
    }

    // Get showtimes for a specific theater and date
    public List<Showtime> getShowtimes(int theaterId, LocalDate date) {
        return showtimeRepository.findByShowroom_Theater_IdAndDate(theaterId, date);
    }

    // Get showrooms with no movie assigned for a specific theater and date
   // public List<Showroom> getShowroomsWithNoMovie(int theaterId, LocalDate date) {
     //   return showtimeRepository.findDistinctShowroomByShowroom_Theater_IdAndDateAndMovieIsNull(theaterId, date);
    //}
}