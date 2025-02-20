package com.TermProject.finema.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;


@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                    .requestMatchers("/movies/**").permitAll() // Allow all requests to movie-related endpoints
                    .anyRequest().authenticated()
                )
                .httpBasic(withDefaults());  // Enable Basic Authentication for testing
        return http.build();
    }

} // SecurityConfig