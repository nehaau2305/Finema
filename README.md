# Finema
Finema is an online cinema e-booking system that allows users to create an account, browse movies and showtimes, and securely reserve tickets. 

## Admin Features
- Add movies with several details such as title, category, synopsis, cast & crew, trailer picture & video, MPAA-US film rating code, & ticket prices for each ticket type.
- Schedule movie showtimes with a date and showroom.
- Manage user accounts by suspending, unsuspending, making into an administrator, or removing administrator status.
- Add promotions with a specified duration.

## User Features
- Secure acount signup with verification code sent to user's email.
- Add movie reviews.
- Select a movie showtime, specify the number of tickets needed for child, adult, or senior viewers, & the seating arrangement for each.
- Pay for order using new or saved credit card information & possibly apply a promotion code for a discount.
- View order history with ability to return tickets.
- Edit profile information.
- Save credit cards with sensitive information encrypted in the database.

## General Features
- Secure password reset functionality with a unqiue link made with a token sent to user's email
- Browse movies & showtimes.
- Account passwords are encrypted in the database for security.

## Screenshots
<a href="images/landing_page.png">
  <img src="images/landing_page.png" height="210">
</a>
<a href="images/account_sign_up.png">
  <img src="images/account_sign_up.png" height="210">
</a>
<a href="images/account_sign_up_card.png">
  <img src="images/account_sign_up_card.png" height="210">
</a>
<a href="images/account_verify.png">
  <img src="images/account_verify.png" height="210">
</a>
<a href="images/database_encryption.png">
  <img src="images/database_encryption.png" height="100">
</a>
<a href="images/movie_search.png">
  <img src="images/movie_search.png" height="240">
</a>
<a href="images/movie_search_filter.png">
  <img src="images/movie_search_filter.png" height="240">
</a>
<a href="images/reset_password.png">
  <img src="images/reset_password.png" height="210">
</a>
<a href="images/reset_password_token.png">
  <img src="images/reset_password_token.png" height="210">
</a>

### Admin
<a href="images/admin_login.png">
  <img src="images/admin_login.png" height="210">
</a>
<a href="images/admin_landing_page.png">
  <img src="images/admin_landing_page.png" height="210">
</a>
<a href="images/admin_add_movie.png">
  <img src="images/admin_add_movie.png" height="210">
</a>
<a href="images/admin_select_date.png">
  <img src="images/admin_select_date.png" height="210">
</a>
<a href="images/admin_select_showroom.png">
  <img src="images/admin_select_showroom.png" height="210">
</a>
<a href="images/admin_select_movie.png">
  <img src="images/admin_select_movie.png" height="210">
</a>
<a href="images/admin_manage_users.png">
  <img src="images/admin_manage_users.png" height="210">
</a>
<a href="images/admin_add_promo.png">
  <img src="images/admin_add_promo.png" height="210">
</a>

### User
<a href="images/user_select_movie.png">
  <img src="images/user_select_movie.png" height="210">
</a>
<a href="images/user_book_tickets.png">
  <img src="images/user_book_tickets.png" height="210">
</a>
<a href="images/user_select_time_tickets.png">
  <img src="images/user_select_time_tickets.png" height="210">
</a>
<a href="images/user_select_seats.png">
  <img src="images/user_select_seats.png" height="210">
</a>
<a href="images/user_order_summ.png">
  <img src="images/user_order_summ.png" height="210">
</a>
<a href="images/user_order_booked.png">
  <img src="images/user_order_booked.png" height="210">
</a>
<a href="images/user_order_history.png">
  <img src="images/user_order_history.png" height="210">
</a>
<a href="images/user_manage_profile.png">
  <img src="images/user_manage_profile.png" height="210">
</a>
<a href="images/user_saved_cards.png">
  <img src="images/user_saved_cards.png" height="210">
</a>

### Email
<a href="images/email_account_verif_code.png">
  <img src="images/email_account_verif_code.png" height="220">
</a>
<a href="images/email_reset_passw.png">
  <img src="images/email_reset_passw.png" height="220">
</a>
<a href="images/email_promo.png">
  <img src="images/email_promo.png" height="220">
</a>

## Prerequisites
1. Ensure the latest version of Java is installed.
2. Download maven if it is not already on the system in order to compile and run the backend code.
3. Install NPM packages. `npm install`

## Setup
1. Create a database on MySQL called "finema_db".
2. Clone or fork this repository
3. To compile the backend:
```bash 
mvn clean install -U
```
4. To run the backend
```bash 
mvn spring-boot:run
```
5. To run the frontend:
```bash 
npm run dev
```

## Technologies Used
- Java 22.0.2
- Spring Boot
- React.js
- MySQL
- Maven
- GitHub

## Contribution
This project was made through the collaborative effort of 4 people.
- Nehaa Umapathy led the team, organized the database architecture, and implmented several backend functionalities such as secure role-based authentication, sensitive data encyrption, and email verification.
- Max Allgaier implemented the backend functionality for movie search with filters, user reviews, promotional offers, and profile editting.
- Joshua Konfrst implemented the frontend functionalities for the user side interface including the user authentication, movie browsing, and ticket booking flow.
- Mudgie Hermann designed and implemented the user interface layout and developed the frontend functionalities for the admin side interface.
