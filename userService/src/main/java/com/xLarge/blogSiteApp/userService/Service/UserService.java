package com.xLarge.blogSiteApp.userService.Service;

import com.xLarge.blogSiteApp.userService.DTO.UserRegisterRequest;
import com.xLarge.blogSiteApp.userService.DTO.UserRegisterResponse;

public interface UserService {

    UserRegisterResponse registerUser(UserRegisterRequest request);

    boolean validateUser(String email,String password);
}



