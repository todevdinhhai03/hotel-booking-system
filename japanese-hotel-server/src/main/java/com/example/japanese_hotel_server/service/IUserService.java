package com.example.japanese_hotel_server.service;

import com.example.japanese_hotel_server.model.User;

import java.util.List;

public interface IUserService {
    User registerUser(User user);
    List<User> getUsers();
    User getUserByEmail(String email);
    User getUserById(Long id);
    void deleteUser(String email);
}
