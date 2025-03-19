package com.TermProject.finema.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@Service
public class MailService {
    @Autowired
    private JavaMailSender mailSender;

    public String sendConfirmationEmail(String toEmail, String userName) {
        try {
            String subject = "Welcome to Finema 🐟";
            String message = "Hi " + userName + ",\n\n" +
                    "Thank you for registering on Finema!\n\n" +
                    "Best Regards,\nFinema Team";

            SimpleMailMessage email = new SimpleMailMessage();
            email.setTo(toEmail);
            email.setSubject(subject);
            email.setText(message);
            email.setFrom("nehaau2305@gmail.com");

            mailSender.send(email);
            return "Confirmation email sent successfully to " + toEmail;
        } catch (Exception e) {
            return "Error sending confirmation email: " + e.getMessage();
        }
    } // sendConfirmationEmail
}