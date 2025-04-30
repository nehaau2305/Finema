package com.TermProject.finema.dto;

import java.util.List;

public class OrderDTO {
    private int id;
    private ShowtimeDTO showtimeDTO;
    private int movieId;
    private int numSeats;
    private double totalPrice;
    private List<TicketDTO> tickets;
    public OrderDTO(int id, ShowtimeDTO showtimeDTO, int movieId, int numSeats, double totalPrice, List<TicketDTO> tickets) {
        this.id = id;
        this.showtimeDTO = showtimeDTO;
        this.movieId = movieId;
        this.numSeats = numSeats;
        this.totalPrice = totalPrice;
        this.tickets = tickets;
    }
    public int getId() {return id;}
    public void setId(int id) {this.id = id;}
    public ShowtimeDTO getShowtimeDTO() {return showtimeDTO;}
    public void setShowtimeDTO(ShowtimeDTO showtimeDTO) {this.showtimeDTO = showtimeDTO;}
    public int getMovieId() {return movieId;}
    public void setMovieId(int movieId) {this.movieId = movieId;}
    public int getNumSeats() {return numSeats;}
    public void setNumSeats(int numSeats) {this.numSeats = numSeats;}
    public double getTotalPrice() {return totalPrice;}
    public void setTotalPrice(double totalPrice) {this.totalPrice = totalPrice;}
    public List<TicketDTO> getTickets() {return tickets;}
    public void setTickets(List<TicketDTO> tickets) {this.tickets = tickets;}
}