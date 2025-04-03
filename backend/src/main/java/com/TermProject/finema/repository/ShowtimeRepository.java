package com.TermProject.finema.repository;

import com.TermProject.finema.entity.Showtime;
import com.TermProject.finema.entity.Showroom;
import com.TermProject.finema.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;
import java.time.LocalDate;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Integer> {
    List<Showtime> findByMovie(Movie movie);
    List<Showtime> findByMovieId(int movieId);
    List<Showtime> findByShowroom(Showroom showroom);
    List<Showtime> findByShowroom_Theater_IdAndDate(int theaterId, LocalDate date);
    //List<Showroom> findDistinctShowroomByShowroom_Theater_IdAndDateAndMovieIsNull(int theaterId, LocalDate date);
}