package com.TermProject.finema.service;

import com.TermProject.finema.entity.Order;
import com.TermProject.finema.entity.Ticket;
import com.TermProject.finema.entity.Seat;
import com.TermProject.finema.entity.Movie;
import com.TermProject.finema.entity.Promotion;
import com.TermProject.finema.entity.User;
import com.TermProject.finema.entity.Showtime;
import com.TermProject.finema.entity.TicketAge;
import com.TermProject.finema.entity.Card;
import com.TermProject.finema.repository.OrderRepository;
import com.TermProject.finema.repository.TicketRepository;
import com.TermProject.finema.repository.SeatRepository;
import com.TermProject.finema.repository.PromotionRepository;
import com.TermProject.finema.repository.MovieRepository;
import com.TermProject.finema.repository.ShowtimeRepository;
import com.TermProject.finema.repository.CardRepository;
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
    private ShowtimeRepository showtimeRepository;

    @Autowired
    private PromotionRepository promoRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private CardRepository CardRepository;

    @Autowired
    UserService userService;

    @Autowired
    private MailService mailService;

    public Order addOrder (Order order, String token) {
        System.out.println("add Order entered with token:  " + token);
        User user = userService.getUserFromToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Invalid token or user not found"));
        order.setUser(user);
        System.out.println("user id: " + order.getUser().getId());
        System.out.println("card num: " + order.getCard().getCardNumber());
        try {
            String encryptedCard = userService.encrypt(order.getCard().getCardNumber());
            order.getCard().setCardNumber(encryptedCard);
            order.getCard().setUser(user);
            order.getCard().setUserID(user);
            cardRepository.save(order.getCard());
            System.out.println("card user: " + order.getCard().getUser().getId());
        } catch (Exception e) {
            System.out.println("Exception: " + e.getMessage());
        }
        List<Ticket> theTickets = order.getTickets();
        order.setTickets(null);
        int showtimeID = order.getShowtimeID();
        Showtime showtime = showtimeRepository.getReferenceById(showtimeID);
        order.setShowtime(showtime);
        System.out.println("movie id: " + order.getMovieId());
        Order savedOrder = orderRepository.save(order);
        if (theTickets != null) {
            for (Ticket ticket : theTickets) {
                System.out.println("addOrder ticket ID: " + ticket.getId());
                ticket.setOrder(savedOrder);
                System.out.println("order id: " + savedOrder.getId());
                Seat seat = ticket.getSeat();
                System.out.println("addOrder seat ID: " + seat.getId());
                seat.setReserved(true);
                seat.setShowtime(showtime);
                seat.setShowtimeID(showtimeID);
                seatRepository.save(seat);
            }
        }
        savedOrder.setTickets(theTickets);
        mailService.sendOrderConfirmation(savedOrder);
        // having cascading in Order allows tickets to be saved automatically when saving order
        return orderRepository.save(savedOrder);
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
        Showtime showtime = order.getShowtime();
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