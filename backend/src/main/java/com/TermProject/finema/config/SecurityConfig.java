package com.TermProject.finema.config;

import com.TermProject.finema.jwt.JwtFilter;
import com.TermProject.finema.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private UserService userService;
    private JwtFilter jwtFilter;

    @Autowired
    public SecurityConfig(UserService userService, JwtFilter jwtFilter) {
        this.userService = userService;
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(withDefaults()) // Enable CORS
            .csrf(csrf -> csrf.disable()) // Disable CSRF using Lambda DSL
            .authorizeHttpRequests(authorize -> authorize
                    .requestMatchers("/movies/**").permitAll() // Allow all requests to movie-related endpoints
                    .requestMatchers("/users/**").permitAll() // Allow all requests to user-related endpoints
                    .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                    .anyRequest().permitAll()
                    // .requestMatchers("/auth/register", "/auth/login", "/auth/newpassword").permitAll()
                    // .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // Allow all OPTIONS requests
                    // .requestMatchers("/users/register").permitAll()
                    // .requestMatchers("/users/login").permitAll()
                    // .requestMatchers("/users/profile").permitAll()
                    // .requestMatchers("/users/logout").permitAll()
                    // .requestMatchers("/users/**").permitAll()
                    // .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // Replace with your frontend URL
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}