package com.xLarge.blogSiteApp.blogService.Service;

import com.xLarge.blogSiteApp.blogService.DTO.BlogCreateRequest;
import com.xLarge.blogSiteApp.blogService.DTO.BlogResponse;
import com.xLarge.blogSiteApp.blogService.DTO.BlogUpdateRequest;

import java.util.List;

public interface BlogService {
    BlogResponse createBlog(BlogCreateRequest request, String username);

    List<BlogResponse> getAllBlogs();

    BlogResponse getBlogById(Long id);

    BlogResponse updateBlog(Long id, BlogUpdateRequest request, String username);

    void deleteBlog(Long id, String username);

    List<BlogResponse> getBlogsByCategory(String category);

    List<BlogResponse> getBlogsByAuthor(String author);

    BlogResponse likeBlog(Long id);

    List<BlogResponse> getTrendingBlogs();

    List<BlogResponse> getFeaturedBlogs(String follower);

    void followAuthor(String follower, String followed);

    void unfollowAuthor(String follower, String followed);

    long countFollowers(String username);

    boolean isFollowing(String follower, String followed);
}
