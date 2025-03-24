package com.TermProject.finema.service;

import com.TermProject.finema.entity.User;
import com.TermProject.finema.jwt.JwtTokenProvider;
import com.TermProject.finema.repository.UserRepository;
import com.TermProject.finema.service.MailService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class AuthService {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private MailService mailService;

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public String authenticateAndGenerateToken(String email, String password) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(password, user.getPassword())) {return null;}
        String token = jwtTokenProvider.generateToken(email);
        user.setToken(token);
        user.setActive(true);
        userRepository.save(user);
        return token;
    } // Authenticate user & generate JWT token

    public String registerUser(User newUser) {
        // check if account already exists
        if (userRepository.existsByEmail(newUser.getEmail())) {
            throw new IllegalArgumentException("This email is already associated with an account.");
        }
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        User savedUser = userRepository.save(newUser);
        // send confirmation email
        //mailService.sendConfirmationEmail(newUser.getEmail(), newUser.getName());
        String token = jwtTokenProvider.generateToken(savedUser.getEmail());
        return token;
    } // register new user

    public User changePassword(String email, String newPassword, String currentPassword) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new IllegalArgumentException("Current Password doesn't match!");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        User newUser = userRepository.save(user);
        System.out.println("4");
        mailService.sendPasswordResetConfirmationEmail(newUser.getEmail(), newUser.getName());
        return newUser;
    }
}