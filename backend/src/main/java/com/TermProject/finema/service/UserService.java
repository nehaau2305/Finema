package com.TermProject.finema.service;

import com.TermProject.finema.entity.User;
import com.TermProject.finema.repository.UserRepository;
import com.TermProject.finema.entity.Card;
import com.TermProject.finema.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.*;
import java.util.*;


@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CardRepository cardRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
        .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                new ArrayList<>()
        );
    }

    public User saveUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email is already taken");
        }
        return userRepository.save(user);
    }

    
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByEmail(username);
    }

    public Optional<User> getUserByToken(String token) {
        String betterToken = token.substring(1, token.length() - 1);
        System.out.println("BETTER TOKEN YOOOOOOOOOO");
        System.out.println(betterToken);
        return userRepository.findByToken(betterToken);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public List<Card> addCard(User user, Card card) {
        String username = user.getEmail()
        card.setUser(user);
        cardRepository.save(card);
        return cardRepository.findByUser(user);
    }

    private String extractUsernameFromToken(String token) {
        String betterToken = token.substring(1, token.length() - 1);
        Optional<User> user = userRepository.findByToken(betterToken);
        String username = "Implement user to username get";
        return username;
    }

    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email is already taken");
        }
        return userRepository.save(user);
    }

}