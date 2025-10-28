# Finema
Finema is an online cinema e-booking system that allows users to create an account, browse movies and showtimes, and securely reserve tickets. 

## Admin Features
- Add movies with several details such as title, category, synopsis, cast & crew, trailer picture & video, MPAA-US film rating code, & ticket prices for each ticket type.
- Schedule movie showtimes with a date and showroom.
- Manage user accounts by suspending, unsuspending, making into an administrator, or removing administrator status.
- Add promotions with a specified duration.

## User Features
- Browse movies & showtimes
- Add movie reviews
- Select a movie showtime, specify the number of tickets needed for child, adult, or senior viewers, & the seating arrangement for each.
- Pay for order using new or saved credit card information & possibly apply a promotion code for a discount

## Screenshots
### Admin

### User

### Email

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
