package com.example.japanese_hotel_server.service;

import com.example.japanese_hotel_server.exception.ResourceNotFoundException;
import com.example.japanese_hotel_server.exception.RoleAlreadyExistException;
import com.example.japanese_hotel_server.exception.UserAlreadyExistsException;
import com.example.japanese_hotel_server.model.Role;
import com.example.japanese_hotel_server.model.User;
import com.example.japanese_hotel_server.repository.IRoleRepository;
import com.example.japanese_hotel_server.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleService implements IRoleService{
    private final IRoleRepository roleRepository;
    private final IUserRepository userRepository;

    @Override
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }
    @Transactional
    @Override
    public Role createRole(Role roleRequest) {
        Role role = new Role("ROLE_" + roleRequest.getName().toUpperCase());
        if (roleRepository.existsByName(role.getName())){
            throw new RoleAlreadyExistException(role.getName() + " role already exists !");
        }
        return roleRepository.save(role);
    }
    @Transactional
    @Override
    public void deleteRole(Long roleId) {
        if(!roleRepository.existsById(roleId)) {
            throw new ResourceNotFoundException("Role with ID " + roleId + " not found!");
        }
        this.removeAllUsersFromRole(roleId);
        roleRepository.deleteById(roleId);
    }

    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("Role with name " + name + " not found!"));
    }
    @Transactional
    @Override
    public User removeUserFromRole(Long userId, Long roleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User with ID " + userId + " not found!"));
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new ResourceNotFoundException("Role with ID " + roleId + " not found!"));
        if(role.getUsers().contains(user)) {
            role.removeUserFromRole(user);
            roleRepository.save(role);
            return user;
        }
        throw new ResourceNotFoundException("Role " + role.getName() + " does not contain user with ID " + userId);
    }

    @Transactional
    @Override
    public Role removeAllUsersFromRole(Long roleId) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new ResourceNotFoundException("Role with ID " + roleId + " not found!"));
        role.removeAllUsersFromRole();
        return roleRepository.save(role);
    }

    @Override
    public User assignRoleToUser(Long userId, Long roleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User with ID " + userId + " not found!"));
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new ResourceNotFoundException("Role with ID " + roleId + " not found!"));
        if(role.getUsers().contains(user)) {
            throw new UserAlreadyExistsException(
                  "User " + user.getFirstName() + " is already assigned to the" + role + " role");
        }
        role.assignRoleToUser(user);
        roleRepository.save(role);
        return user;
    }
}
