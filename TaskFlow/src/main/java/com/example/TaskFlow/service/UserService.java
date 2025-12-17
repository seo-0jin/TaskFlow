package com.example.TaskFlow.service;

import com.example.TaskFlow.dao.UserDao;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserDao userDao;

    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }
}
