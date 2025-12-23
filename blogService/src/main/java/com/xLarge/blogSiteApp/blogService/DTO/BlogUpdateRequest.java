package com.xLarge.blogSiteApp.blogService.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class BlogUpdateRequest {

    @NotBlank
    @Size(min = 5, max = 200)
    private String title;

    @NotBlank
    @Size(min = 20)
    private String content;

    @NotBlank
    @Size(min = 3, max = 100)
    private String category;

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

    public @NotBlank @Size(min = 3, max = 100) String getCategory() {
        return category;
    }

    public void setCategory(@NotBlank @Size(min = 3, max = 100) String category) {
        this.category = category;
    }
}
