package com.TermProject.finema.service;

import com.TermProject.finema.entity.Order;
import com.TermProject.finema.entity.Ticket;
import com.TermProject.finema.repository.OrderRepository;
import com.TermProject.finema.repository.TicketRepository;
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
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private SeatRepository seatRepository;

    public Order addOrder (Order order) {
        if (order.getTickets() != null) {
            for (Ticket ticket : order.getTickets()) {
                ticket.setOrder(order);
                Seat seat = ticket.getSeat();
                seat.setReserved(true);
                seatRepository.save(seat);
            }
        }
        // having cascading in Order allows tickets to be saved automatically when saving order
        return orderRepository.save(order);
    }



}