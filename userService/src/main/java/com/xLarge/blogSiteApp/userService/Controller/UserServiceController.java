package com.xLarge.blogSiteApp.userService.Controller;

import com.xLarge.blogSiteApp.userService.DTO.UserRegisterRequest;
import com.xLarge.blogSiteApp.userService.DTO.UserRegisterResponse;
import com.xLarge.blogSiteApp.userService.Service.UserService;
import jakarta.validation.Valid;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1.0/blogsite/user")
public class UserServiceController {

    public UserServiceController(UserService userService) {
        this.userService = userService;
    }

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserRegisterResponse> registerUser(@Valid  @RequestBody UserRegisterRequest userRegisterRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.registerUser(userRegisterRequest));
    }
}
