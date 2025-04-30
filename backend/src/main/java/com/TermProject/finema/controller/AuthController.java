package com.TermProject.finema.controller;

import com.TermProject.finema.entity.User;
import com.TermProject.finema.dto.LoginRequest;
import com.TermProject.finema.dto.PasswordChangeRequest;
import com.TermProject.finema.dto.AuthRequest;
import com.TermProject.finema.dto.AuthResponse;
import com.TermProject.finema.dto.ForgotPasswordRequest;
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
            String token = authService.registerUser(newUser);
            return ResponseEntity.status(201).body(token);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(400).body("Error registering user: " + e.getMessage());
        }
    } // register

    @PutMapping("/newpassword")
    public ResponseEntity<String> setPassword(@RequestBody PasswordChangeRequest passwordChange) {
        try {
            authService.changePassword(passwordChange.getEmail(), passwordChange.getNewPassword(), passwordChange.getCurrentPassword());
            return ResponseEntity.status(201).body("User registered successfully");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(400).body("Error changing password: " + e.getMessage());
        }
    } // register

    @PutMapping("/password-change-after-forgot")
    public ResponseEntity<String> setAfterForgotPassword(@RequestBody ForgotPasswordRequest forgotPassword) {
        try {
            System.out.println("pw: " + forgotPassword.getpassword());
            System.out.println("token: " + forgotPassword.getToken());
            authService.changeAfterForgotPassword(forgotPassword.getToken(), forgotPassword.getpassword());
            return ResponseEntity.status(201).body("Password changed successfully");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(400).body("Error changing password: " + e.getMessage());
        }
    } // register
}