package com.TermProject.finema.controller;

import com.TermProject.finema.dto.AuthRequest;
import com.TermProject.finema.dto.AuthResponse;
import com.TermProject.finema.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginRequest) {
        String token = authService.authenticateAndGenerateToken(loginRequest.getEmail(), loginRequest.getPassword());
        //THIS METHOD HAS NOT BEEN CREATED YET
        //NEED TO MAKE THIS METHOD IN AUTHSERVICE.JAVA
        //NEED TO MAKE JWT FILE TO GENERATE TOKEN
        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        return ResponseEntity.ok(token);
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User newUser) {
        User savedUser = authService.registerUser(newUser);
        return ResponseEntity.status(201).body(savedUser);
        //CAN DELETE GIVING RESPONSE TO SUCCESSFULLY CREATING USER ACCOUNT
    }

}