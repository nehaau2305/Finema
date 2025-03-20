package com.TermProject.finema.service;

import com.TermProject.finema.entity.User;
import com.TermProject.finema.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.*;
import java.util.*;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

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
        //String betterToken = token.substring(1, token.length() - 1);
        return userRepository.findByToken(token);
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email is already taken");
        }
        return userRepository.save(user);
    }

}