package com.TermProject.finema.repository;

import com.TermProject.finema.entity.Card;
import com.TermProject.finema.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card, Integer> {
    List<Card> findByUser(User user);
    void deleteById(int cardID);
}