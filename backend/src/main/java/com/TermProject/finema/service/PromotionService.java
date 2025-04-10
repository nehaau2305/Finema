package com.TermProject.finema.service;

import com.TermProject.finema.entity.Promotion;
import com.TermProject.finema.repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.MimeMessageHelper;


import java.time.LocalDateTime;
import java.util.List;

@Service
public class PromotionService {

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserService userService; // Assuming you have a UserService to fetch subscribed users

    public Promotion addPromotion(Promotion promotion) {
        promotion.setCreatedAt(LocalDateTime.now());
        Promotion savedPromotion = promotionRepository.save(promotion);

        // Send promotional email to subscribed users
        sendPromotionalEmail(savedPromotion);

        return savedPromotion;
    }

    public void deletePromotion(Long id) {
        promotionRepository.deleteById(id);
    }

    private void sendPromotionalEmail(Promotion promotion) {
        List<String> subscribedEmails = userService.getSubscribedEmails(); // Fetch subscribed users' emails
    
        for (String email : subscribedEmails) {
            try {
                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true);
    
                helper.setTo(email);
                helper.setSubject("🎉 New Promotion: " + promotion.getTitle() + " 🎉");
    
                // HTML content for the email
                String emailContent = "<div style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>"
                    + "<h1 style='color: #4CAF50;'>🐟 REEL IN THIS EXCITING PROM<span style='color: #2196F3;'>OCEAN</span>: " + promotion.getTitle() + " 🌊</h1>"
                    + "<p>Ahoy there! 🐠 We’ve cast our nets wide to bring you a <strong>fin-tastic</strong> promotion just for you! 🎁</p>"
                    + "<h2 style='color: #2196F3;'>✨ Catch the Details Below ✨</h2>"
                    + "<p><strong>Description:</strong> <em>" + promotion.getDescription() + "</em></p>" // Italicized description
                    + "<p><strong>Promotion Code:</strong> <span style='color: #FF5722; font-weight: bold;'>" + promotion.getCode() + "</span></p>" // Highlighted promotion code
                    + "<p><strong>Start Date:</strong> " + promotion.getStartDate() + "</p>"
                    + "<p><strong>End Date:</strong> " + promotion.getEndDate() + "</p>"
                    + "<p style='margin-top: 20px;'>Don’t let this one swim away! 🐡 Use the promotion code at checkout to enjoy the benefits. 🎣</p>"
                    + "<p>We hope this promotion makes a splash! 🌊</p>"
                    + "<p>Cheers,<br>The Finema Team 🐬</p>"
                    + "</div>";

                helper.setText(emailContent, true); // Set the email content as HTML
                mailSender.send(message);
            } catch (MessagingException e) {
                System.err.println("Failed to send email to " + email + ": " + e.getMessage());
            }
        }
    }
}
