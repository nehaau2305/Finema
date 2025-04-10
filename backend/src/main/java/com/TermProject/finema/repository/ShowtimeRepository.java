package com.TermProject.finema.repository;

import com.TermProject.finema.entity.Showtime;
import com.TermProject.finema.entity.Showroom;
import com.TermProject.finema.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;
import java.time.LocalDate;
import com.TermProject.finema.entity.ConsecutiveTimes;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Integer> {
    List<Showtime> findByMovie(Movie movie);
    List<Showtime> findByMovieId(int movieId);
    List<Showtime> findByShowroom(Showroom showroom);
    List<Showtime> findByDate(LocalDate date);
    List<Showtime> findByDateAndTime(LocalDate date, ConsecutiveTimes time);
    List<Showtime> findByMovieIdAndDateGreaterThanEqual(int movieId, LocalDate now);
    boolean existsByDate(LocalDate date);
    Optional<Showtime> findByShowroomIdAndDateAndTime(int showroomId, LocalDate date, ConsecutiveTimes time);


}