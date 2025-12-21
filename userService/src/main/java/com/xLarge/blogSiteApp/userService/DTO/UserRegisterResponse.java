package com.xLarge.blogSiteApp.userService.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
public class UserRegisterResponse {
    private Long id;
    private String userName;
    private String emailId;

    public UserRegisterResponse() {
    }

    public UserRegisterResponse(Long id, String emailId, String userName) {
        this.id = id;
        this.emailId = emailId;
        this.userName = userName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }
}
