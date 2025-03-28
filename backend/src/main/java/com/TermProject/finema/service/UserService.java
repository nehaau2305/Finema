package com.TermProject.finema.service;

import com.TermProject.finema.entity.User;
import com.TermProject.finema.repository.UserRepository;
import com.TermProject.finema.entity.Card;
import com.TermProject.finema.repository.CardRepository;
import com.TermProject.finema.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.*;
import java.util.*;

//for card encyption
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.security.NoSuchAlgorithmException;
import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidKeyException;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private String secretKey = "SecretFinemaCard"; // has to be 16 bytes for AES-128 encryption
    // AES allows for encryption & decryption using same key
    SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(), "AES"); // convert secretKey into byte array
    Cipher cipher = null;


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

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public String encrypt(String data) throws Exception {
        try {
            cipher = Cipher.getInstance("AES"); // cipher to encrypt using AES encyrption algorithm
            cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec);
            byte[] encryptedBytes = cipher.doFinal(data.getBytes());
            return Base64.getEncoder().encodeToString(encryptedBytes);
        } catch (NoSuchAlgorithmException | NoSuchPaddingException | InvalidKeyException | BadPaddingException | IllegalBlockSizeException e) {
            System.out.println("Error encrypting cards: " + e.getMessage());
            return null;
        }
    }

    public String decrypt(String encryptedData) throws Exception {
        try {
            cipher = Cipher.getInstance("AES"); // cipher to decrypt using AES encyrption algorithm
            cipher.init(Cipher.DECRYPT_MODE, secretKeySpec);
            byte[] decodedBytes = Base64.getDecoder().decode(encryptedData);
            byte[] decryptedBytes = cipher.doFinal(decodedBytes);
            return new String(decryptedBytes);
        } catch (NoSuchAlgorithmException | NoSuchPaddingException | InvalidKeyException | BadPaddingException | IllegalBlockSizeException e) {
            System.out.println("Error decrypting cards: " + e.getMessage());
            return null;
        }
    }

    public List<Card> addCard(User user, Card card) {
        List<Card> userCards = cardRepository.findByUser(user);
        if (userCards.size() >= 4) {
            throw new IllegalStateException("You can only maintain a maximum of 4 cards. Please remove another card first if you would like to add this card.");
        }
        try {
            card.setCardNumber(encrypt(card.getCardNumber()));
            card.setCvv(encrypt(card.getCvv()));
        } catch (Exception e) {
            System.out.println("Encryption failed: " + e.getMessage());
            //throw new RuntimeException("Encryption failed: " + e.getMessage());
        }
        card.setUser(user);
        cardRepository.save(card);
        return cardRepository.findByUser(user);
    }

   // public List<Card> deleteCard(User user, Card card) {
   //     Set<Card> cards = user.getCards();
   //     Card cardToDelete = cards.stream()
   //                          .filter(c -> c.getId().equals(card.getId()))
   //                          .findFirst()
   //                          .orElseThrow(() -> new RuntimeException("Card not found"));
   //     cards.remove(cardToDelete);
   //     user.setCards(cards);
   //     userRepository.save(user);
   //     return new ArrayList<>(cards);
   // }


    public List<Card> getCards(User user) {
        List<Card> cards = cardRepository.findByUser(user);
        System.out.println("Entered getCards for:  " + user.getEmail());
        for (Card card : cards) {
            try {
                System.out.println("Encrypted card#: " + card.getCardNumber());
                card.setCardNumber(decrypt(card.getCardNumber()));
                System.out.println("Decrypted card#: " + card.getCardNumber());
                card.setCvv(decrypt(card.getCvv()));
            } catch (Exception e) {
                System.out.println("Decryption failed: " + e.getMessage());
                //throw new RuntimeException("Decryption failed: " + e.getMessage());
            }
        }
        return cards;
    }

    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email is already taken");
        }
        return userRepository.save(user);
    }

    public Optional<User> getUserFromToken(String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7); // Remove "Bearer " prefix
        }
        String email = jwtTokenProvider.extractUsername(token);
        return userRepository.findByEmail(email);
    }

    //public List<Card> getCardsByUser(User user) {
        //return cardRepository.findByUser(user);
    //}

}