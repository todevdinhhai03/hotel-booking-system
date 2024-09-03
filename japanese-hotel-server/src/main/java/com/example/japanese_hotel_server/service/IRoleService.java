package com.example.japanese_hotel_server.service;

import com.example.japanese_hotel_server.model.Role;
import com.example.japanese_hotel_server.model.User;

import java.util.List;

public interface IRoleService {
    List<Role> getRoles();
    Role createRole(Role roleRequest);
    void deleteRole(Long roleId);
    Role findByName(String name);
    User removeUserFromRole(Long userId, Long roleId);
    Role removeAllUsersFromRole(Long roleId);
    User assignRoleToUser(Long userId, Long roleId);

}
