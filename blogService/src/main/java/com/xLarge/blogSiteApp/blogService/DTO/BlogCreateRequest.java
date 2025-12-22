package com.xLarge.blogSiteApp.blogService.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class BlogCreateRequest {

    @NotBlank
    @Size(min = 5, max = 200)
    private String title;

    @NotBlank
    @Size(min = 20)
    private String content;

    public @NotBlank @Size(min = 5, max = 200) String getTitle() {
        return title;
    }

    public void setTitle(@NotBlank @Size(min = 5, max = 200) String title) {
        this.title = title;
    }

    public @NotBlank @Size(min = 20) String getContent() {
        return content;
    }

    public void setContent(@NotBlank @Size(min = 20) String content) {
        this.content = content;
    }
}