package com.TermProject.finema.service;

import com.TermProject.finema.entity.User;
import com.TermProject.finema.jwt.JwtTokenProvider;
import com.TermProject.finema.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class AuthService {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public String authenticateAndGenerateToken(String email, String password) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(password, user.getPassword())) {return null;}
        return jwtTokenProvider.generateToken(email);
    } // Authenticate user & generate JWT token

    public User registerUser(User newUser) {
        // check if account already exists
        if (userRepository.existsByEmail(newUser.getEmail())) {
            throw new IllegalArgumentException("This email is already associated with an account.");
        }
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        return userRepository.save(newUser);
    } // register new user
}