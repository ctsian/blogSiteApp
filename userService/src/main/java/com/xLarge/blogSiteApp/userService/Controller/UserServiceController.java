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
public class UserServiceController {


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
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.registerUser(userRegisterRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> login(@Valid @RequestBody UserLoginRequest loginRequest){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUserName(),
                        loginRequest.getPassword()
                )
        );

        String token=jwtUtil.generateToken(loginRequest.getUserName());

        return ResponseEntity.ok(new UserLoginResponse(token, loginRequest.getUserName()));
    }
}
