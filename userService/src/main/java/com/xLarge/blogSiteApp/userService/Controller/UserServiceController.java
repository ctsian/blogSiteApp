package com.xLarge.blogSiteApp.userService.Controller;

import com.xLarge.blogSiteApp.userService.Config.JwtUtil;
import com.xLarge.blogSiteApp.userService.DTO.UserLoginRequest;
import com.xLarge.blogSiteApp.userService.DTO.UserLoginResponse;
import com.xLarge.blogSiteApp.userService.DTO.UserRegisterRequest;
import com.xLarge.blogSiteApp.userService.DTO.UserRegisterResponse;
import com.xLarge.blogSiteApp.userService.Service.UserService;
import jakarta.validation.Valid;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1.0/blogsite/user")
@Slf4j
public class UserServiceController {

//    private static final Logger log= LoggerFactory.getLogger(UserServiceController.class);

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public UserServiceController(UserService userService, AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }


    @PostMapping("/register")
    public ResponseEntity<UserRegisterResponse> registerUser(@Valid  @RequestBody UserRegisterRequest userRegisterRequest){
        log.info("Received registration request for email: {}", userRegisterRequest.getEmailId());
        log.debug("Registration payload: {}", userRegisterRequest);
        UserRegisterResponse response = userService.registerUser(userRegisterRequest);

        log.info("User registered successfully with ID: {}", response.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> login(@Valid @RequestBody UserLoginRequest loginRequest){
        log.info("Login attempt for username: {}", loginRequest.getUserName());

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUserName(),
                            loginRequest.getPassword()
                    )
            );
        } catch (Exception e) {
            log.error("Authentication failed for user: {}", loginRequest.getUserName(), e);
            throw e;
        }

        String token = jwtUtil.generateToken(loginRequest.getUserName());
        log.info("Login successful, token generated for user: {}", loginRequest.getUserName());
        return ResponseEntity.ok(new UserLoginResponse(token, loginRequest.getUserName()));
    }
}
