package com.TermProject.finema.controller;

import com.TermProject.finema.entity.User;
import com.TermProject.finema.service.UserService;
import com.TermProject.finema.service.MailService;
import com.TermProject.finema.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MailService mailService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User registeredUser = userService.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        User user = userService.getUserByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(user);
    }

    @PostMapping("/profile")
    public ResponseEntity<User> getUserByToken(@RequestBody String token) {
        User user = userService.getUserByToken(token).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(user);
    }

    @PostMapping("/logout")
    public ResponseEntity<User> updateUserToken(@RequestBody String token) {
        User user = userService.getUserByToken(token).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        user.setToken(null);
        User updatedUser = userService.updateUser(user);
        return ResponseEntity.ok(updatedUser);
    }
    //eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqIiwiaWF0IjoxNzQyNDgzNzEyLCJleHAiOjE3NDI1NzAxMTJ9.njIB-uiDfWkAJ63bBd3DIVr2S08wg9pbjUTJMB78Aho
    //eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqIiwiaWF0IjoxNzQyNDgzODc5LCJleHAiOjE3NDI1NzAyNzl9.SRdw5114KwEE5lhZTz6JO7KWLtDH8GM26SpkkSimFoQ

    @PutMapping("/{username}")
    public ResponseEntity<User> updateUser(@PathVariable String username, @RequestBody User user) {
        User existingUser = userService.getUserByUsername(username).orElse(null);
        if (existingUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        existingUser.setName(user.getName());
        existingUser.setPhone(user.getPhone());
        existingUser.setPassword(user.getPassword());
        existingUser.setHomeAddress(user.getHomeAddress());
        existingUser.setCardNumber(user.getCardNumber());
        existingUser.setExpirationDate(user.getExpirationDate());
        existingUser.setBillingAddress(user.getBillingAddress());
        existingUser.setAdmin(user.getIsAdmin());
        User updatedUser = userService.updateUser(existingUser);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/details")
    public ResponseEntity<User> getUserDetails(@RequestParam String email) {
        Optional<User> user = userRepository.findByEmail(email);

        System.out.println("User found: " + user.get().getEmail() + " | isAdmin: " + user.get().getIsAdmin());
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        if (email == null || email.isEmpty()) {return ResponseEntity.badRequest().body("Email is required");}
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            String response = mailService.sendResetPasswordEmail(user.get().getEmail(), user.get().getName());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found");
        }
    }


}