package com.TermProject.finema.service;

import com.TermProject.finema.entity.Order;
import com.TermProject.finema.entity.Ticket;
import com.TermProject.finema.entity.Seat;
import com.TermProject.finema.entity.Promotion;
import com.TermProject.finema.repository.OrderRepository;
import com.TermProject.finema.repository.TicketRepository;
import com.TermProject.finema.repository.SeatRepository;
import com.TermProject.finema.repository.PromotionRepository;
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

    @Autowired
    private PromotionRepository promoRepository;

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


    public double verifyPromo (String promoCode) {
        Promotion promo = promoRepository.findByCode(promoCode);
        if (promo == null) throw new IllegalArgumentException("Promo code not found.");
        LocalDate now = LocalDate.now();
        if (now.isBefore(promo.getStartDate())) throw new IllegalArgumentException("Promo code is not active yet.");
        if (now.isAfter(promo.getEndDate())) throw new IllegalArgumentException("Promo code has expired.");
        return promo.getDiscount();
    }

}