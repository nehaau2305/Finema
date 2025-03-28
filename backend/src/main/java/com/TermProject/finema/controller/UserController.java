package com.TermProject.finema.controller;

import com.TermProject.finema.entity.User;
import com.TermProject.finema.jwt.JwtTokenProvider;
import com.TermProject.finema.entity.Card;
import com.TermProject.finema.service.MailService;
import com.TermProject.finema.service.UserService;
import com.TermProject.finema.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.Optional;
import java.util.List;
import java.util.Random;
import java.util.Map;


@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    
    @Autowired
    private MailService mailService;

    Random random = new Random();

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @GetMapping("/profile")
    public ResponseEntity<User> getUserByToken(@RequestHeader("Authorization") String token) {
        Optional<User> user = userService.getUserFromToken(token);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/cards")
    public ResponseEntity<List<Card>> getUserCards(@RequestHeader("Authorization") String token) {
        Optional<User> user = userService.getUserFromToken(token);
        if (user.isPresent()) {
            //currentUser = user.get();
            List<Card> cards = userService.getCards(user.get());
            return ResponseEntity.ok(cards);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }




    
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        if (email == null || email.isEmpty()) {return ResponseEntity.badRequest().body("Email is required");}
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            String response = mailService.sendResetPasswordEmail(user.get().getEmail(), user.get().getName());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found");
        }
    }


    // @PostMapping("/register")
    // public ResponseEntity<String> registerUser(@RequestBody User user) {
    //     User registeredUser = userService.registerUser(user);
    //     String token = jwtTokenProvider.generateToken(user.getEmail());
    //     return ResponseEntity.status(HttpStatus.CREATED).body(token);
    // }

    @PostMapping("/sendregistercode")
    public ResponseEntity<String> sendRegistrationCode(@RequestBody User user) {
        int code = random.nextInt(100000, 1000000);
        String codeString = String.valueOf(code);
        boolean response = mailService.sendRegistrationEmail(user.getEmail(), user.getName(), codeString);
        if (!response) {
            return ResponseEntity.status(HttpStatus.SEE_OTHER).body("Error Sending email");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(codeString);
    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        User user = userService.getUserByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(user);
    }

    @PostMapping("/logout")
    public ResponseEntity<User> updateUserToken(@RequestHeader("Authorization") String token) {

        Optional<User> user = userService.getUserFromToken(token);
        if (user.isPresent()) {
            User updatedUser = user.get();
            updatedUser.setToken(null);
            updatedUser.setActive(false);
            userService.updateUser(updatedUser);
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/{username}")
    public ResponseEntity<User> updateUser(@PathVariable String username, @RequestBody User user) {
        Optional<User> existingUser = userService.getUserByUsername(username);
        if (existingUser.isPresent()) {
            User updatedUser = existingUser.get();
            updatedUser.setName(user.getName());
            updatedUser.setPhone(user.getPhone());
            updatedUser.setPassword(user.getPassword());
            updatedUser.setHomeAddress(user.getHomeAddress());
            updatedUser.setAdmin(user.getIsAdmin());
            updatedUser.setPromotions(user.isPromotions());
            userService.updateUser(updatedUser);
            boolean response = mailService.sendProfileUpdatedEmail(username, user.getName());
            if (response == true) {
                return ResponseEntity.ok(updatedUser);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // @GetMapping("/cards")
    // public ResponseEntity<List<Card>> getCards(@RequestHeader("Authorization") String token) {
    //     System.out.println("HEyy");
    //     Optional<User> user = userService.getUserFromToken(token);
    //     if (user.isPresent()) {
    //         List<Card> retrievedCards = userService.getCards(user.get());
    //         return ResponseEntity.ok(retrievedCards);
    //     } else {
    //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    //     }
    // }

    @PostMapping("/addCard")
    public ResponseEntity<List<Card>> addCard(@RequestBody Card card, @RequestHeader("Authorization") String token) {
        Optional<User> user = userService.getUserFromToken(token);
        if (user.isPresent()) {
            List<Card> updatedCards = userService.addCard(user.get(), card);
            return ResponseEntity.ok(updatedCards);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

   // @DeleteMapping("/deleteCard")
   // public ResponseEntity<List<Card>> deleteCard(@RequestBody Card card, @RequestHeader("Authorization") String token) {
   //     Optional<User> user = userService.getUserFromToken(token);
   //     if (user.isPresent()) {
   //         List<Card> updatedCards = userService.deleteCard(user.get(), card);
   //         return ResponseEntity.ok(updatedCards);
   //     } else {
   //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
   //     }
   // }


    @GetMapping("/details")
    public ResponseEntity<User> getUserDetails(@RequestParam String email) {
        Optional<User> user = userRepository.findByEmail(email);

        System.out.println("User found: " + user.get().getEmail() + " | isAdmin: " + user.get().getIsAdmin());
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}