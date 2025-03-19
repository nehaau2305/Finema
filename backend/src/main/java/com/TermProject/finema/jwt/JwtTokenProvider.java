package com.TermProject.finema.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import java.security.Key; // for Key
import java.util.Base64; // encodes & decodes key string
import javax.crypto.spec.SecretKeySpec; // converts secreyKey into Key object
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;

@Service
public class JwtTokenProvider {
    private final String secretKey = "FinemaSecretKeyFinemaForFinemaJWTTokenFinema";
    private final Key key = new SecretKeySpec(Base64.getDecoder().decode(secretKey), SignatureAlgorithm.HS256.getJcaName());

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 24 hours expiration time
                .signWith(key, SignatureAlgorithm.HS256)
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

    public boolean validateToken(String token, String username) {
        try {
            String extractedUsername = extractUsername(token);
            if (!username.equals(extractedUsername)) {throw new RuntimeException("Token Validation Failed: Username does not match.");}
            if (isTokenExpired(token)) {throw new RuntimeException("Token Validation Failed: Token is expired.");}
            return true;
        } catch (Exception e) {
            System.out.println("Invalid JWT Token: " + e.getMessage());
            return false;
        }
    }
}