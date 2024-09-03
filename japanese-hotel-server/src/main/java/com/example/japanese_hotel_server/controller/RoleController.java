package com.example.japanese_hotel_server.controller;

import com.example.japanese_hotel_server.model.Role;
import com.example.japanese_hotel_server.model.User;
import com.example.japanese_hotel_server.service.IRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class RoleController {
    private final IRoleService roleService;
    @GetMapping
    public ResponseEntity<List<Role>> getAllRoles(){
        return ResponseEntity.ok(roleService.getRoles());
    }

    @PostMapping
    public ResponseEntity<Void> createRole(@RequestBody Role roleRequest){
        roleService.createRole(roleRequest);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{roleId}")
    public ResponseEntity<Void> deleteRole(@PathVariable("roleId") Long roleId){
        roleService.deleteRole(roleId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{roleId}/users")
    public ResponseEntity<Role> removeAllUsersFromRole(@PathVariable("roleId") Long roleId){
        return ResponseEntity.ok(roleService.removeAllUsersFromRole(roleId));
    }

    @PutMapping("/users")
    public ResponseEntity<User> removeUserFromRole(@RequestParam("userId") Long userId, @RequestParam("roleId") Long roleId) {
        return ResponseEntity.ok(roleService.removeUserFromRole(userId, roleId));
    }

    @PutMapping("/assign")
    public ResponseEntity<User> assignUserToRole(
            @RequestParam("userId") Long userId,
            @RequestParam("roleId") Long roleId){
        return ResponseEntity.ok(roleService.assignRoleToUser(userId, roleId));
    }
}
