package com.xLarge.blogSiteApp.userService.DTO;

import jakarta.validation.constraints.NotBlank;

public class UserLoginRequest {
    @NotBlank
    private String userName;

    @NotBlank
    private String password;

    public @NotBlank String getUserName() {
        return userName;
    }

    public void setUserName(@NotBlank String userName) {
        this.userName = userName;
    }

    public @NotBlank String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank String password) {
        this.password = password;
    }

    public UserLoginRequest(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }
}
