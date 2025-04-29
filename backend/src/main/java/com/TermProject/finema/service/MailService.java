package com.TermProject.finema.service;

import com.TermProject.finema.entity.User;
import com.TermProject.finema.entity.Order;
import com.TermProject.finema.entity.Showtime;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import com.TermProject.finema.repository.UserRepository;

import java.util.List;

@Service
public class MailService {
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    public boolean sendRegistrationEmail(String toEmail, String userName, String code) {
        try {
            String subject = "Welcome to Finema 🐟";
            String message = "Hi " + userName + ",\n\n" +
                    "To verify your account, please type the following code into the webpage: \n" + 
                    code + "\n" +
                    "Thank you for registering on Finema!\n\n" +
                    "Best Regards,\nFinema Team";

            SimpleMailMessage email = new SimpleMailMessage();
            email.setTo(toEmail);
            email.setSubject(subject);
            email.setText(message);
            email.setFrom("finemateam@gmail.com");

            mailSender.send(email);
            return true;
        } catch (Exception e) {
            return false;
        }
    } // sendConfirmationEmail

    //for forgot password
    public String sendResetPasswordEmail(String toEmail, String userName, String token) {
        try {
            String resetLink = "http://localhost:3000/reset?token=" + token;

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

    public boolean sendProfileUpdatedEmail(String toEmail, String userName) {
        try {
            String subject = "Finema Account: Profile Updates Confirmation";
            String message = "Hi " + userName + ",\n\n" +
                    "Your profile was successfully updated.\n\n" +
                    "Best Regards,\nFinema Team";

            SimpleMailMessage email = new SimpleMailMessage();
            email.setTo(toEmail);
            email.setSubject(subject);
            email.setText(message);
            email.setFrom("finemateam@gmail.com");

            mailSender.send(email);
            return true;
        } catch (Exception e) {
            return false;
        }
    } // sendProfileUpdatedEmail

    public String sendPromotionEmail(String promotionText) {
        try {
            //need to get only users that are registered
            List<User> users = userRepository.findByPromotionsTrue();
            for (User user : users) {
                String subject = "New Promotion Available!";
                String message = "Hi " + user.getName() + ",\n\n" +
                                 "Check out our new promotion: " + promotionText + "\n\n" +
                                 "Best Regards,\nFinema Team";
                SimpleMailMessage email = new SimpleMailMessage();
                email.setTo(user.getEmail());
                email.setSubject(subject);
                email.setText(message);
                email.setFrom("finemateam@gmail.com");
                mailSender.send(email);
            }
            return "promotion email sent";
        } catch (Exception e) {
            return "rrror sending promotion email: " + e.getMessage();
        }
    }

    public String sendOrderConfirmation(Order order) {
        Showtime showtime = order.getTickets().get(0).getShowtime();
        try {
            String cardNum = userService.decrypt(order.getCard().getCardNumber());
            String subject = "Finema Movie Order Confirmation for " + showtime.getMovie().getTitle();
            String message = "Hi " + order.getUser().getName() + ",\n\n" +
                    "You have " + order.getNumSeats() + " tickets to " + showtime.getMovie().getTitle() + " on " + showtime.getDate() + " at " + showtime.getTime() + "\n\n" +
                    "Your order total was $" + order.getTotalPrice() + " and was charged to the card ending in " + cardNum.substring(cardNum.length() - 4) + "\n\n" +
                    "Best Regards,\nFinema Team";

            SimpleMailMessage email = new SimpleMailMessage();
            email.setTo(order.getUser().getEmail());
            email.setSubject(subject);
            email.setText(message);
            email.setFrom("finemateam@gmail.com");

            mailSender.send(email);
            return "order confirmation email sent";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

}