package com.xLarge.blogSiteApp.userService.Entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="blogUsers")
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    @Column(nullable = false, unique = true)
    private String userName;

    @Email
    @NotBlank
    @Column(nullable = false,unique = true)
    private  String emailId;

    @NotBlank
    @Size(min = 5)
    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public User() {
    }

    public User(long id, String userName, String emailId, String password, LocalDateTime createdAt) {
        this.id = id;
        this.userName = userName;
        this.emailId = emailId;
        this.password = password;
        this.createdAt = createdAt;
    }

    public User( String userName, String emailId, String password, LocalDateTime createdAt) {
        this.userName = userName;
        this.emailId = emailId;
        this.password = password;
        this.createdAt = createdAt;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public @NotBlank String getUserName() {
        return userName;
    }

    public void setUserName(@NotBlank String userName) {
        this.userName = userName;
    }

    public @Email @NotBlank String getEmailId() {
        return emailId;
    }

    public void setEmailId(@Email @NotBlank String emailId) {
        this.emailId = emailId;
    }

    public @NotBlank @Size(min = 5) String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank @Size(min = 5) String password) {
        this.password = password;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
