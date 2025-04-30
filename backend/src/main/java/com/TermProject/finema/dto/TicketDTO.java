package com.TermProject.finema.dto;

import com.TermProject.finema.entity.TicketAge;

public class TicketDTO {
    private int id;
    private int seatNum;
    private TicketAge ticketAge;
    public TicketDTO(int id, int seatNum, TicketAge ticketAge) {
        this.id = id;
        this.seatNum = seatNum;
        this.ticketAge = ticketAge;
    }
    public int getId() {return id;}
    public void setId(int id) {this.id = id;}
    public int getSeatNum() {return seatNum;}
    public void setSeatNum(int seatNum) {this.seatNum = seatNum;}
    public TicketAge getTicketAge() {return ticketAge;}
    public void setTicketAge(TicketAge ticketAge) {this.ticketAge = ticketAge;}
}