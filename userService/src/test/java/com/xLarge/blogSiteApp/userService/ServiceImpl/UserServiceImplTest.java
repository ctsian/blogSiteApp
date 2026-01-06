package com.xLarge.blogSiteApp.userService.ServiceImpl;

import com.xLarge.blogSiteApp.userService.DTO.UserRegisterRequest;
import com.xLarge.blogSiteApp.userService.DTO.UserRegisterResponse;
import com.xLarge.blogSiteApp.userService.Service.impl.UserServiceImpl;
import com.xLarge.blogSiteApp.userService.Entity.User;
import com.xLarge.blogSiteApp.userService.Exception.UserAlreadyExistsException;
import com.xLarge.blogSiteApp.userService.Repository.IUserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private IUserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    void registerUser_Success() {
        UserRegisterRequest request = new UserRegisterRequest("testUser", "test@test.com", "pass");
        User user = new User("testUser", "test@test.com", "encodedPass", LocalDateTime.now());
        user.setId(1L);

        when(userRepository.existsByEmailId(request.getEmailId())).thenReturn(false);
        when(userRepository.existsByUserName(request.getUserName())).thenReturn(false);
        when(passwordEncoder.encode(request.getPassword())).thenReturn("encodedPass");
        when(userRepository.save(any(User.class))).thenReturn(user);

        UserRegisterResponse response = userService.registerUser(request);

        assertNotNull(response);
        assertEquals("testUser", response.getUserName());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void registerUser_EmailExists() {
        UserRegisterRequest request = new UserRegisterRequest("testUser", "test@test.com", "pass");
        when(userRepository.existsByEmailId(request.getEmailId())).thenReturn(true);

        assertThrows(UserAlreadyExistsException.class, () -> userService.registerUser(request));
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void validateUser_Success() {
        User user = new User("user", "test@test.com", "encodedPass", LocalDateTime.now());
        when(userRepository.findByEmailId("test@test.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("pass", "encodedPass")).thenReturn(true);

        assertTrue(userService.validateUser("test@test.com", "pass"));
    }
}