package com.TermProject.finema.controller;

import com.TermProject.finema.entity.Order;
import com.TermProject.finema.service.OrderService;
import com.TermProject.finema.entity.User;
import com.TermProject.finema.entity.Movie;
import com.TermProject.finema.entity.Showtime;
import com.TermProject.finema.service.UserService;
import com.TermProject.finema.service.MovieService;
import com.TermProject.finema.dto.OrderDTO;
import com.TermProject.finema.dto.TicketDTO;
import com.TermProject.finema.dto.ShowtimeDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.List;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public ResponseEntity<Order> addOrder(@RequestBody Order order, @RequestHeader("Authorization") String authHeader) {
        System.out.println("order cotnroller entered with token:  " + authHeader);
        Order savedOrder = orderService.addOrder(order, authHeader);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
    }

    @PostMapping("/verify-promo")
    public ResponseEntity<?> verifyPromo(@RequestBody String promoCode) {
        // remove quotes from raw JSON string
        String cleanCode = promoCode.replace("\"", "");
        try {
            double discount = orderService.verifyPromo(cleanCode);
            return ResponseEntity.ok(discount);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/cancel-order")
    public ResponseEntity<Order> cancelOrder(@RequestBody Order order) {
        System.out.println("order controller entered for cancel order");
        Order cancelledOrder = orderService.cancelOrder(order);
        return ResponseEntity.ok(cancelledOrder);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAll(@RequestHeader("Authorization") String authHeader) {
        System.out.println("order controller entered for getting all orders for given user: " + authHeader);
        Optional<User> user = userService.getUserFromToken(authHeader);
        if (user.isPresent()) {
            List<Order> orders = orderService.getAllOrders(user.get());
            // List<OrderDTO> orderDTOList = orders.stream().map(order -> {
            //     List<TicketDTO> ticketDTOList = order.getTickets().stream().map(ticket -> {
            //         int seatNum = ticket.getSeat().getSeatNum();
            //         return new TicketDTO(ticket.getId(), seatNum, ticket.getTicketAge());
            //     }).collect(Collectors.toList());

            //     Showtime showtime = order.getShowtime();
            //     ShowtimeDTO showtimeDTO = new ShowtimeDTO(
            //         showtime.getId(),
            //         showtime.getDate().toString(),
            //         showtime.getTime(),
            //         showtime.getMovie().getTitle()
            //     );

            //     return new OrderDTO (
            //         order.getId(),
            //         showtimeDTO,
            //         order.getMovieId(),
            //         order.getNumSeats(),
            //         order.getTotalPrice(),
            //         ticketDTOList
            //     );
            // }).collect(Collectors.toList());
            for (Order order: orders) {
                System.out.println(order.getShowtime().getMovie().getTitle());
            }
            return ResponseEntity.ok(orders);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping
    public ResponseEntity<String> returnOrder(@RequestBody Order order) {
        orderService.returnOrder(order);
        return ResponseEntity.status(201).body("Order returned successfully. Refund will be processed.");
    }

}