package com.TermProject.finema.repository;

import com.TermProject.finema.entity.Showroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface ShowroomRepository extends JpaRepository<Showroom, Integer> {

}