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
            email.setFrom("finemateam@gmail.com");

            mailSender.send(email);
            return "Confirmation email sent successfully to " + toEmail;
        } catch (Exception e) {
            return "Error sending confirmation email: " + e.getMessage();
        }
    } // sendConfirmationEmail

    public String sendResetPasswordEmail(String toEmail, String userName) {
        try {
            String resetLink = "http://localhost:3000/forgot-password?email=" + toEmail;

            String subject = "Finema Account: Reset Password";
            String message = "Hi " + userName + ",\n\n" +
                    "Please follow this link to change your password.\n" +
                    resetLink + "\n\n" +
                    "Best Regards,\nFinema Team";

            SimpleMailMessage email = new SimpleMailMessage();
            email.setTo(toEmail);
            email.setSubject(subject);
            email.setText(message);
            email.setFrom("finemateam@gmail.com");

            mailSender.send(email);
            return "Reset Password email verification email sent successfully to " + toEmail;
        } catch (Exception e) {
            return "Error sending Reset Password email verification email: " + e.getMessage();
        }
    } // sendResetPasswordEmail

    public String sendPasswordResetConfirmationEmail(String toEmail, String userName) {
        try {
            String subject = "Finema Account: Password Reset Confirmation";
            String message = "Hi " + userName + ",\n\n" +
                    "Your password was successfully reset.\n\n" +
                    "Best Regards,\nFinema Team";

            SimpleMailMessage email = new SimpleMailMessage();
            email.setTo(toEmail);
            email.setSubject(subject);
            email.setText(message);
            email.setFrom("finemateam@gmail.com");

            mailSender.send(email);
            return "Password reset confirmation email sent successfully to " + toEmail;
        } catch (Exception e) {
            return "Error sending Password reset confirmation email: " + e.getMessage();
        }
    } // sendPasswordResetConfirmationEmail

}