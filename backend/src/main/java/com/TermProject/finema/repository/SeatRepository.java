package com.TermProject.finema.repository;

import com.TermProject.finema.entity.Seat;
import com.TermProject.finema.entity.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Integer> {
    List<Seat> findByShowtime(Showtime showtime);
    List<Seat> findByShowtimeId(int showtimeId);
}