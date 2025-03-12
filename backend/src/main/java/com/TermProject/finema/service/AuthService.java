package com.TermProject.finema.service;

import com.TermProject.finema.entity.User;
import com.TermProject.finema.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    // Authenticate user and generate JWT token
    public String authenticateAndGenerateToken(String email, String password) {
        // ADD CODE TO AUTHENTICATE ACCOUNT & THEN GENERATE TOKEN
    }

    public User registerUser(User newUser) {
        // check if account already exists
        if (userRepository.existsByEmail(newUser.getEmail())) {
            throw new IllegalArgumentException("This email is already associated with an account.");
        }
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        return userRepository.save(newUser);
    }
}