package com.TermProject.finema.service;

import com.TermProject.finema.entity.Showtime;
import com.TermProject.finema.entity.Showroom;
import com.TermProject.finema.entity.ConsecutiveTimes;
import com.TermProject.finema.repository.ShowtimeRepository;
import com.TermProject.finema.repository.ShowroomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import java.util.stream.Collectors;
import java.util.Set;
import java.util.LinkedHashMap;
import java.util.Map;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ShowtimeService {

    @Autowired
    private ShowtimeRepository showtimeRepository;

    @Autowired
    private ShowroomRepository showroomRepository;

    // default showtimes for current date & tomorrow
    @PostConstruct
    public void createDefaultShowrooms() {
        boolean showtimesExists = showtimeRepository.existsById(1);
        if (showtimesExists == false) {
            addShowtimesByDate(LocalDate.now());
            addShowtimesByDate(LocalDate.now().plusDays(1));
        }
    }

    // Add showtimes for a specific date
    public List<Showtime> addShowtimesByDate(LocalDate date) {
        List<Showroom> showrooms = showroomRepository.findAll();
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


    // Get showtimes for a specific date
    public List<Showtime> getShowtimes(LocalDate date) {
        return showtimeRepository.findByDate(date);
    }

    // to return only the showrooms available for each time for the provided date
    public Map<ConsecutiveTimes, List<Showroom>> getAvailableShowroomsByTime(LocalDate date) {
        List<Showroom> allShowrooms = showroomRepository.findAll();
        Map<ConsecutiveTimes, List<Showroom>> result = new LinkedHashMap<>();
        for (ConsecutiveTimes time : ConsecutiveTimes.values()) {
            List<Showtime> showtimesAtThisTime = showtimeRepository.findByDateAndTime(date, time);
            // if movie has a non null value, the showroom is booked and unavilable
            // can do manually using for loop & parsing through whole list instead
            // of stream * collectors if this doesnt work
            Set<Integer> unavailableShowroomIds = showtimesAtThisTime.stream()
                    .filter(st -> st.getMovie() != null)
                    .map(st -> st.getShowroom().getId())
                    .collect(Collectors.toSet());
            // only include the showtimes where movie is null
            List<Showroom> available = allShowrooms.stream()
                    .filter(sr -> !unavailableShowroomIds.contains(sr.getId()))
                    .collect(Collectors.toList());

            result.put(time, available);
        }
        // will return times and showrooms
        return result;
    }


    public Showtime scheduleMovie(Showtime showtime) {return showtimeRepository.save(showtime);}

}