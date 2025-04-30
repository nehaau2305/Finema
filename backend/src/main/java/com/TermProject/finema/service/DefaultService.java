package com.TermProject.finema.service;

import com.TermProject.finema.entity.User;
import com.TermProject.finema.entity.Movie;
import com.TermProject.finema.entity.MpaaRating;
import com.TermProject.finema.repository.UserRepository;
import com.TermProject.finema.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import jakarta.annotation.PostConstruct;

@Service
public class DefaultService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    //PostConstruct makes sure this method runs only after the application
    @PostConstruct
    public void createDefaultAdmin() {
        boolean adminExists = userRepository.existsByEmail("finemateam@gmail.com");
        if(adminExists == false) {
            User admin = new User();
            admin.setName("Admin");
            admin.setEmail("finemateam@gmail.com");
            admin.setPassword(passwordEncoder.encode("finemafinema"));
            admin.setAdmin(true);
            userRepository.save(admin);
            System.out.println("Default admin account created.");
        } else {
            System.out.println("Default admin already exists.");
        }
    }

    @PostConstruct
    public void createDefaultNemoMovie() {
        boolean movieExists = movieRepository.existsByTitle("Finding Nemo");
        if (movieExists == false) {
            Movie movie = new Movie();
            movie.setTitle("Finding Nemo");
            movie.setCategory("Kids");
            movie.setDirector("Andrew Stanton");
            movie.setProducer("Pixar");
            movie.setSynopsis("A clownfish dad travels the ocean to search for his captured son.");
            movie.setTrailerPicture("https://lumiere-a.akamaihd.net/v1/images/p_findingnemo_19752_05271d3f.jpeg");
            movie.setTrailerVideo("https://www.youtube.com/watch?v=9oQ628Seb9w");
            movie.setMpaaRating(MpaaRating.valueOf("G"));
            movie.setNowShowing(true);
            movie.setComingSoon(false);
            movie.setCast("Alexander Gould, Albert Brooks, Ellen DeGeneres, Bob Peterson, Willem Dafoe, Andrew Stanton");
            movie.setChildTicketPrice(6.00);
            movie.setAdultTicketPrice(12.00);
            movie.setSeniorTicketPrice(8.00);
            movieRepository.save(movie);
            System.out.println("Default Finding Nemo movie just created.");
        } else {
            System.out.println("Default Finding Nemo movie already exists.");
        }
    } // createDefaultNemo

    @PostConstruct
    public void createDefaultJawsMovie() {
        boolean movieExists = movieRepository.existsByTitle("Jaws");
        if (movieExists == false) {
            Movie movie = new Movie();
            movie.setTitle("Jaws");
            movie.setCategory("Action");
            movie.setDirector("Steven Spielberg");
            movie.setProducer("Richard D. Zanuck and David Brown");
            movie.setSynopsis("3 people work together to capture a killer shark.");
            movie.setTrailerPicture("https://i.ebayimg.com/images/g/Ue0AAOSwc5xm7ton/s-l1200.jpg");
            movie.setTrailerVideo("https://www.youtube.com/watch?v=U1fu_sA7XhE");
            movie.setMpaaRating(MpaaRating.valueOf("PG"));
            movie.setNowShowing(false);
            movie.setComingSoon(true);
            movie.setCast("Roy Scheider, Robert Shaw, Richard Dreyfuss, Lorraine Gary");
            movie.setChildTicketPrice(10.00);
            movie.setAdultTicketPrice(16.00);
            movie.setSeniorTicketPrice(14.00);
            movieRepository.save(movie);
            System.out.println("Default Jaws movie just created.");
        } else {
            System.out.println("Default Jaws movie already exists.");
        }
    } // createDefaultJaws


    @PostConstruct
    public void createDefaultSharknadoMovie() {
        boolean movieExists = movieRepository.existsByTitle("Sharknado");
        if (movieExists == false) {
            Movie movie = new Movie();
            movie.setTitle("Sharknado");
            movie.setCategory("Horror");
            movie.setDirector("Anthony C. Ferrante");
            movie.setProducer("David Michael Latt and Geoffrey Mark");
            movie.setSynopsis("A group of friends try to save the Santa Monica coast from shark-infested tornadoes.");
            movie.setTrailerPicture("https://m.media-amazon.com/images/M/MV5BNTNkOTA0NjYtM2VjOC00ZmYzLWI1NzQtMjY4NTU2MGNkZmU0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg");
            movie.setTrailerVideo("https://www.youtube.com/watch?v=TWu0zZljle4");
            movie.setMpaaRating(MpaaRating.valueOf("R"));
            movie.setNowShowing(true);
            movie.setComingSoon(false);
            movie.setCast("Ian Ziering, Tara Reid, John Heard, Cassandra Scerbo, Jaason Simmons");
            movie.setChildTicketPrice(15.50);
            movie.setAdultTicketPrice(24.00);
            movie.setSeniorTicketPrice(20.00);
            movieRepository.save(movie);
            System.out.println("Default Sharknado movie just created.");
        } else {
            System.out.println("Default Sharknado movie already exists.");
        }
    } // createDefaultSharknado



    @PostConstruct
    public void createDefaultSharkTaleMovie() {
        boolean movieExists = movieRepository.existsByTitle("Shark Tale");
        if (movieExists == false) {
            Movie movie = new Movie();
            movie.setTitle("Shark Tale");
            movie.setCategory("Kids");
            movie.setDirector("Rob Letterman, Vicky Jenson, Bibo Bergeron");
            movie.setProducer("Dreamworks");
            movie.setSynopsis("A small fish and a shark son of a mob boss team up to portray the fish as the 'Sharkslayer'.");
            movie.setTrailerPicture("https://m.media-amazon.com/images/I/51kG6eufR-L._AC_UF894,1000_QL80_.jpg");
            movie.setTrailerVideo("https://www.youtube.com/watch?v=b5EcRbTWm2A");
            movie.setMpaaRating(MpaaRating.valueOf("PG"));
            movie.setNowShowing(false);
            movie.setComingSoon(true);
            movie.setCast("Will Smith, Robert De Niro, Jack Black, Martin Scorsese, Renée Zellweger, Angelina Jolie");
            movie.setChildTicketPrice(7.50);
            movie.setAdultTicketPrice(13.50);
            movie.setSeniorTicketPrice(10.00);
            movieRepository.save(movie);
            System.out.println("Default Shark Tale movie just created.");
        } else {
            System.out.println("Default Shark Tale movie already exists.");
        }
    } // createDefaultSharkTale
}