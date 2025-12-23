package com.xLarge.blogSiteApp.blogService.DTO;

import java.time.LocalDateTime;

public class BlogResponse {

    private Long id;
    private String title;
    private String content;
    private String category;
    private String authorUsername;
    private LocalDateTime createdAt;
    private int likes;

    public BlogResponse(Long id, String title, String content,
                        String category, String authorUsername, LocalDateTime createdAt, int likes) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.category = category;
        this.authorUsername = authorUsername;
        this.createdAt = createdAt;
        this.likes = likes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getAuthorUsername() {
        return authorUsername;
    }

    public void setAuthorUsername(String authorUsername) {
        this.authorUsername = authorUsername;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }
}
