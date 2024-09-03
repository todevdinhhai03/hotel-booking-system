package com.example.japanese_hotel_server.service;

import com.example.japanese_hotel_server.exception.ResourceNotFoundException;
import com.example.japanese_hotel_server.exception.UserAlreadyExistsException;
import com.example.japanese_hotel_server.model.Role;
import com.example.japanese_hotel_server.model.User;
import com.example.japanese_hotel_server.repository.IRoleRepository;
import com.example.japanese_hotel_server.repository.IUserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService{
    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final IRoleRepository roleRepository;
    private final String ROLE_USER = "ROLE_USER";
    @Transactional
    @Override
    public User registerUser(User user) {
        if(userRepository.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException(user.getEmail() + " already exists!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role userRole = roleRepository.findByName(ROLE_USER)
                .orElseThrow(() -> new ResourceNotFoundException(ROLE_USER + "not found!"));
        user.setRoles(Collections.singletonList(userRole));
        return userRepository.save(user);
    }

    @Transactional
    @Override
    public void deleteUser(String email) {
        if(!userRepository.existsByEmail(email)) {
            throw new ResourceNotFoundException("Email " + email + " does not exists!");
        }
        userRepository.deleteByEmail(email);
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(()-> new ResourceNotFoundException(email + " does not exist!"));
    }

    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(()-> new ResourceNotFoundException("user not found with id " + userId));
    }
}
