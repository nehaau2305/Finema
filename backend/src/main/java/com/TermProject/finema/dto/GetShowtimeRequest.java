package com.TermProject.finema.dto;

import com.TermProject.finema.entity.Theater;
import java.time.LocalDate;

public class GetShowtimeRequest {
    private int theaterId;
    private LocalDate date;
    public int getTheaterId() {return theaterId;}
    public void setTheaterId(int theaterId) {this.theaterId = theaterId;}
    public LocalDate getDate() {return date;}
    public void setDate(LocalDate date) {this.date = date;}
}