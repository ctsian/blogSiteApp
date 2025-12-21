package com.xLarge.blogSiteApp.userService.Service.impl;

import com.xLarge.blogSiteApp.userService.DTO.UserRegisterRequest;
import com.xLarge.blogSiteApp.userService.DTO.UserRegisterResponse;
import com.xLarge.blogSiteApp.userService.Exception.UserAlreadyExistsException;
import com.xLarge.blogSiteApp.userService.Repository.IUserRepository;
import com.xLarge.blogSiteApp.userService.Service.UserService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import com.xLarge.blogSiteApp.userService.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private final IUserRepository userRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(IUserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public UserRegisterResponse registerUser(UserRegisterRequest request) {
        if (userRepository.existsByEmailId(request.getEmailId())) {
            throw new UserAlreadyExistsException("Email already registered");
        }

        if (userRepository.existsByUserName(request.getUserName())) {
            throw new UserAlreadyExistsException("Username already taken");
        }

        User user = new User(
                request.getUserName(),
                request.getEmailId(),
                passwordEncoder.encode(request.getPassword()),
                LocalDateTime.now()
        );

        User savedUser= userRepository.save(user);

        return new UserRegisterResponse(
                savedUser.getId(),
                savedUser.getUserName(),
                savedUser.getEmailId()
        );
    }

    @Override
    public boolean validateUser(String email, String password) {
        return userRepository.findByEmailId(email)
                .map(user -> passwordEncoder.matches(password,user.getPassword()))
                .orElse(false);
    }
}
