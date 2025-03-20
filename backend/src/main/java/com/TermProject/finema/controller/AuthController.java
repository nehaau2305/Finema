package com.TermProject.finema.controller;

import com.TermProject.finema.entity.User;
import com.TermProject.finema.dto.LoginRequest;
import com.TermProject.finema.jwt.JwtTokenProvider;
import com.TermProject.finema.dto.AuthRequest;
import com.TermProject.finema.dto.AuthResponse;
import com.TermProject.finema.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;


    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("Login attempt for: " + loginRequest.getEmail());
        String token = authService.authenticateAndGenerateToken(loginRequest.getEmail(), loginRequest.getPassword());
        if (token == null || token.isEmpty()) {return ResponseEntity.status(401).body("Invalid credentials");}
        System.out.println("Generated token: " + token);
        return ResponseEntity.ok(token);
    } // login

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User newUser) {
        try {
            authService.registerUser(newUser);
            return ResponseEntity.status(201).body("User registered successfully");
        } catch (Exception e) {return ResponseEntity.status(400).body("Error registering user: " + e.getMessage());}
    } // register
}