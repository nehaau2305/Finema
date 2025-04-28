package com.TermProject.finema.service;

import com.TermProject.finema.entity.Order;
import com.TermProject.finema.entity.Ticket;
import com.TermProject.finema.entity.Seat;
import com.TermProject.finema.entity.Promotion;
import com.TermProject.finema.entity.User;
import com.TermProject.finema.entity.Showtime;
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

    @Autowired
    UserService userService;

    @Autowired
    private MailService mailService;

    public Order addOrder (Order order, String token) {
        System.out.println("add Order entered with token:  " + token);
        User user = userService.getUserFromToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Invalid token or user not found"));
        order.setUser(user);
        if (order.getTickets() != null) {
            for (Ticket ticket : order.getTickets()) {
                System.out.println("addOrder ticket ID: " + ticket.getId());
                ticket.setOrder(order);
                Seat seat = ticket.getSeat();
                System.out.println("addOrder seat ID: " + seat.getId());
                seat.setReserved(true);
                seatRepository.save(seat);
            }
        }
        // having cascading in Order allows tickets to be saved automatically when saving order
        mailService.sendOrderConfirmation(order);
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

    public Order cancelOrder (Order order) {
        System.out.println("cancel Order entered");
        Showtime showtime = order.getTickets().get(0).getShowtime();
        LocalDate now = LocalDate.now();
        if (now.isBefore(showtime.getDate())) {
            orderRepository.deleteById(order.getId());
            return order;
        } else if (now.isEqual(showtime.getDate())) {
            throw new IllegalArgumentException("Can not cancel an order to a movie playing on the current date.");
        } else {
            throw new IllegalArgumentException("This movie's showtime has already passed.");
        }
    }

    public List<Order> getAllOrders (User user) {
        System.out.println("orderService getAllOrders entered for: " + user.getEmail());
        return orderRepository.findByUser(user);
    }

}