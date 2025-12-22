package com.xLarge.blogSiteApp.blogService.Controller;

import com.xLarge.blogSiteApp.blogService.DTO.BlogCreateRequest;
import com.xLarge.blogSiteApp.blogService.DTO.BlogResponse;
import com.xLarge.blogSiteApp.blogService.DTO.BlogUpdateRequest;
import com.xLarge.blogSiteApp.blogService.Service.BlogService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1.0/blogsite/blog")
public class BlogController {

    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @PostMapping
    public ResponseEntity<BlogResponse> createBlog(
            @Valid @RequestBody BlogCreateRequest request) {

        String username = getCurrentUsername();

        BlogResponse response = blogService.createBlog(request, username);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<BlogResponse>> getAllBlogs() {
        return ResponseEntity.ok(blogService.getAllBlogs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogResponse> getBlogById(@PathVariable Long id) {
        return ResponseEntity.ok(blogService.getBlogById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BlogResponse> updateBlog(
            @PathVariable Long id,
            @Valid @RequestBody BlogUpdateRequest request) {

        String username = getCurrentUsername();
        return ResponseEntity.ok(blogService.updateBlog(id, request, username));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {

        String username = getCurrentUsername();
        blogService.deleteBlog(id, username);
        return ResponseEntity.noContent().build();
    }

    private String getCurrentUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getName();
    }
}

