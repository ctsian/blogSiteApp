package com.xLarge.blogSiteApp.userService.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.xLarge.blogSiteApp.userService.Config.JwtUtil;
import com.xLarge.blogSiteApp.userService.DTO.UserLoginRequest;
import com.xLarge.blogSiteApp.userService.DTO.UserRegisterRequest;
import com.xLarge.blogSiteApp.userService.DTO.UserRegisterResponse;
import com.xLarge.blogSiteApp.userService.Service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserServiceController.class)
@AutoConfigureMockMvc(addFilters = false) // Disable security filters for unit test
class UserServiceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService;

    @MockitoBean
    private AuthenticationManager authenticationManager;

    @MockitoBean
    private JwtUtil jwtUtil;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testRegisterUser_Success() throws Exception {
        UserRegisterRequest request = new UserRegisterRequest("testUser", "test@test.com", "password123");
        UserRegisterResponse response = new UserRegisterResponse(1L,"test@test.com", "testUser");

        when(userService.registerUser(any(UserRegisterRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/v1.0/blogsite/user/register")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.userName").value("testUser"));
    }

    @Test
    void testLogin_Success() throws Exception {
        UserLoginRequest request = new UserLoginRequest("testUser", "password123");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(null);
        when(jwtUtil.generateToken("testUser")).thenReturn("mock-token");

        mockMvc.perform(post("/api/v1.0/blogsite/user/login")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("mock-token"));
    }
}
