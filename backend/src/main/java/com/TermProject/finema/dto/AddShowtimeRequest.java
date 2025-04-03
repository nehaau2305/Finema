package com.TermProject.finema.dto;

import com.TermProject.finema.entity.Theater;
import java.time.LocalDate;

public class AddShowtimeRequest {
    private Theater theater;
    private LocalDate date;
    public Theater getTheater() {return theater;}
    public void setTheater(Theater theater) {this.theater = theater;}
    public LocalDate getDate() {return date;}
    public void setDate(LocalDate date) {this.date = date;}
}