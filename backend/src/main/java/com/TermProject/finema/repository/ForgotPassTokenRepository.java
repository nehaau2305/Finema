package com.TermProject.finema.repository;

import com.TermProject.finema.entity.ForgotPasswordToken;
import com.TermProject.finema.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ForgotPassTokenRepository extends JpaRepository<ForgotPasswordToken, Integer> {
    Optional<ForgotPasswordToken> findByToken (String token);
    List<ForgotPasswordToken> findAllByExpirationTimeBefore(LocalDateTime now);
}