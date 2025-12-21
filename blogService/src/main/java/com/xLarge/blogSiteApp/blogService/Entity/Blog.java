package com.xLarge.blogSiteApp.blogService.Entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;

    @Column(length = 10000)
    private String content;
    private String author;
    private LocalDateTime createdAt;
}
