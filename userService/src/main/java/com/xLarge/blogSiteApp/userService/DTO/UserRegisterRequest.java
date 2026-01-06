package com.xLarge.blogSiteApp.userService.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UserRegisterRequest {
    @NotBlank
    private String userName;

    @Email
    @NotBlank
    private String emailId;

    @NotBlank
    @Size(min = 5)
    private String password;

    public @NotBlank @Size(min = 5) String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank @Size(min = 5) String password) {
        this.password = password;
    }

    public @Email @NotBlank String getEmailId() {
        return emailId;
    }

    public void setEmailId(@Email @NotBlank String emailId) {
        this.emailId = emailId;
    }

    public @NotBlank String getUserName() {
        return userName;
    }

    public void setUserName(@NotBlank String userName) {
        this.userName = userName;
    }

    public UserRegisterRequest(String userName, String emailId, String password) {
        this.userName = userName;
        this.emailId = emailId;
        this.password = password;
    }
}
