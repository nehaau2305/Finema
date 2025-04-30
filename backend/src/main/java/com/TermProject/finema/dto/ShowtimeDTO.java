package com.TermProject.finema.dto;

import com.TermProject.finema.entity.ConsecutiveTimes;
import java.time.LocalDate;
import java.util.List;

public class ShowtimeDTO {
    private int id;
    private String date;
    private ConsecutiveTimes time;
    private String movieName;
    public ShowtimeDTO(int id, String date, ConsecutiveTimes time, String movieName) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.movieName = movieName;
    }
    public int getId() {return id;}
    public void setId(int id) {this.id = id;}
    public String getDate() {return date;}
    public void setDate(String date) {this.date = date;}
    public ConsecutiveTimes getTime() {return time;}
    public void setTime(ConsecutiveTimes time) {this.time = time;}
    public String getMovieName() {return movieName;}
    public void setMovieName(String movieName) {this.movieName = movieName;}
}