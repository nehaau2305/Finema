package com.TermProject.finema.service;

import com.TermProject.finema.entity.User;
import com.TermProject.finema.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import jakarta.annotation.PostConstruct;

@Service
public class DefaultAdminService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    //PostConstruct makes sure this method runs only after the application
    @PostConstruct
    public void createDefaultAdmin() {
        boolean adminExists = userRepository.existsByEmail("finemateam@gmail.com");
        if(adminExists == false) {
            User admin = new User();
            admin.setName("Admin");
            admin.setEmail("finemateam@gmail.com");
            admin.setPassword(passwordEncoder.encode("finemafinema"));
            admin.setAdmin(true);
            userRepository.save(admin);
            System.out.println("Default admin account created.");
        } else {
            System.out.println("Defaul admin already exists.");
        }
    }
}