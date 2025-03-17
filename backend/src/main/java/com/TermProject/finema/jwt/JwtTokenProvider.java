package com.TermProject.finema.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtTokenProvider {
    private String secretKey = "secret";

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 24 hours expiration time
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact(); // Builds token
    }

    public String extractUsername(String token) {return extractClaims(token).getSubject();}

    private Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey) // Use secret key to validate token
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean isTokenExpired(String token) {return extractExpiration(token).before(new Date());}

    private Date extractExpiration(String token) {return extractClaims(token).getExpiration();}

    public boolean validateToken(String token, String username) {return (username.equals(extractUsername(token)) && !isTokenExpired(token));}
}