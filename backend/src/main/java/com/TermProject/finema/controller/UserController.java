package com.TermProject.finema.controller;

import com.TermProject.finema.entity.User;
import com.TermProject.finema.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;



}