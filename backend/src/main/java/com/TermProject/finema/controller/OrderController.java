package com.TermProject.finema.controller;

import com.TermProject.finema.entity.Order;
import com.TermProject.finema.service.OrderService;
import com.TermProject.finema.entity.User;
import com.TermProject.finema.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
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
            return ResponseEntity.ok(orders);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}