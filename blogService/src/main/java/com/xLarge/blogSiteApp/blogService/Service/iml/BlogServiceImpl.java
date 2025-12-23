package com.xLarge.blogSiteApp.blogService.Service.iml;

import com.xLarge.blogSiteApp.blogService.DTO.BlogCreateRequest;
import com.xLarge.blogSiteApp.blogService.DTO.BlogResponse;
import com.xLarge.blogSiteApp.blogService.DTO.BlogUpdateRequest;
import com.xLarge.blogSiteApp.blogService.Entity.Blog;
import com.xLarge.blogSiteApp.blogService.Entity.Follow;
import com.xLarge.blogSiteApp.blogService.Exception.ResourceNotFoundException;
import com.xLarge.blogSiteApp.blogService.Exception.UnauthorizedException;
import com.xLarge.blogSiteApp.blogService.Repository.BlogRepository;
import com.xLarge.blogSiteApp.blogService.Repository.FollowRepository;
import com.xLarge.blogSiteApp.blogService.Service.BlogService;
import com.xLarge.blogSiteApp.blogService.Util.BlogMapper;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;
    private final FollowRepository followRepository;

    public BlogServiceImpl(BlogRepository blogRepository, FollowRepository followRepository) {
        this.blogRepository = blogRepository;
        this.followRepository = followRepository;
    }

    @Override
    public BlogResponse createBlog(BlogCreateRequest request, String author) {

        Blog blog = new Blog();
        blog.setTitle(request.getTitle());
        blog.setContent(request.getContent());
        blog.setCategory(request.getCategory());
        blog.setAuthor(author);
        blog.setCreatedAt(LocalDateTime.now());
        blog.setLikes(0);

        Blog saved = blogRepository.save(blog);

        return BlogMapper.toResponse(saved);
    }

    @Override
    public List<BlogResponse> getAllBlogs() {
        return blogRepository.findAll()
                .stream()
                .map(BlogMapper::toResponse)
                .toList();
    }

    @Override
    public BlogResponse getBlogById(Long id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found"));
        return BlogMapper.toResponse(blog);
    }

    @Override
    public BlogResponse updateBlog(Long id, BlogUpdateRequest request, String author) {

        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found"));

        if (!blog.getAuthor().equals(author)) {
            throw new UnauthorizedException("You are not allowed to update this blog");
        }

        blog.setTitle(request.getTitle());
        blog.setContent(request.getContent());
        blog.setCategory(request.getCategory());

        return BlogMapper.toResponse(blogRepository.save(blog));
    }

    @Override
    public void deleteBlog(Long id, String author) {

        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found"));

        if (!blog.getAuthor().equals(author)) {
            throw new UnauthorizedException("You are not allowed to delete this blog");
        }

        blogRepository.delete(blog);
    }

    @Override
    public List<BlogResponse> getBlogsByCategory(String category) {
        return blogRepository.findByCategoryIgnoreCase(category)
                .stream()
                .map(BlogMapper::toResponse)
                .toList();
    }

    @Override
    public List<BlogResponse> getBlogsByAuthor(String author) {
        return blogRepository.findByAuthor(author)
                .stream()
                .map(BlogMapper::toResponse)
                .toList();
    }

    @Override
    public BlogResponse likeBlog(Long id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found"));
        blog.setLikes(blog.getLikes() + 1);
        return BlogMapper.toResponse(blogRepository.save(blog));
    }

    @Override
    public List<BlogResponse> getTrendingBlogs() {
        return blogRepository.findTop50ByOrderByLikesDescCreatedAtDesc()
                .stream()
                .map(BlogMapper::toResponse)
                .toList();
    }

    @Override
    public List<BlogResponse> getFeaturedBlogs(String follower) {
        List<Follow> follows = followRepository.findByFollower(follower);
        if (follows.isEmpty()) {
            return List.of();
        }
        List<String> authors = follows.stream()
                .map(Follow::getFollowed)
                .toList();

        return blogRepository.findByAuthorInOrderByCreatedAtDesc(authors)
                .stream()
                .map(BlogMapper::toResponse)
                .toList();
    }

    @Override
    public void followAuthor(String follower, String followed) {
        if (follower.equals(followed)) {
            return;
        }
        if (followRepository.existsByFollowerAndFollowed(follower, followed)) {
            return;
        }
        Follow follow = new Follow();
        follow.setFollower(follower);
        follow.setFollowed(followed);
        follow.setCreatedAt(LocalDateTime.now());
        followRepository.save(follow);
    }

    @Override
    public void unfollowAuthor(String follower, String followed) {
        followRepository.deleteByFollowerAndFollowed(follower, followed);
    }

    @Override
    public long countFollowers(String username) {
        return followRepository.countByFollowed(username);
    }

    @Override
    public boolean isFollowing(String follower, String followed) {
        return followRepository.existsByFollowerAndFollowed(follower, followed);
    }
}