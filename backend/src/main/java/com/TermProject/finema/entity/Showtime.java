package com.TermProject.finema.entity;

import jakarta.persistence.*;
import java.util.Date;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "showtime")
public class Showtime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "movieID")
    private int movieId;

    @ManyToOne
    @JoinColumn(name = "movie")
    private Movie movie;

    @Column(name = "showroomID")
    private int showroomId;

    @ManyToOne
    @JoinColumn(name = "showroom", nullable = false)
    private Showroom showroom;

    @Column(name = "date", nullable = false)
    private LocalDate date;
    // date: "YYYY-MM-DD"

    //@Column(name = "time", nullable = false)
    //private LocalTime time;
    // time: "HH:MM:SS"

    @Enumerated(EnumType.STRING)
    private ConsecutiveTimes time;

    public Showtime() {}

    public int getId() {return id;}
    public void setId(int id) {this.id = id;}
    public int getMovieId() {return movieId;}
    public void setMovieId(int movieId) {this.movieId = movieId;}
    public Movie getMovie() {return movie;}
    public void setMoive(Movie movie) {this.movie = movie;}
    public int getShowroomId() {return showroomId;}
    public void setShowroomId(int showroomId) {this.showroomId = showroomId;}
    public Showroom getShowroom() {return showroom;}
    public void setShowroom(Showroom showroom) {this.showroom = showroom;}
    public LocalDate getDate() {return date;}
    public void setDate(LocalDate date) {this.date = date;}
    //public LocalTime getTime() {return time;}
    //public void setTime(LocalTime time) {this.time = time;}
    public ConsecutiveTimes getTime() {return time;}
    public void setTime(ConsecutiveTimes time) {this.time = time;}

}