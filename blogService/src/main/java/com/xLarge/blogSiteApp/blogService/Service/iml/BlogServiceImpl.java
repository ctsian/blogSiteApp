package com.xLarge.blogSiteApp.blogService.Service.iml;

import com.xLarge.blogSiteApp.blogService.DTO.BlogCreateRequest;
import com.xLarge.blogSiteApp.blogService.DTO.BlogResponse;
import com.xLarge.blogSiteApp.blogService.DTO.BlogUpdateRequest;
import com.xLarge.blogSiteApp.blogService.Entity.Blog;
import com.xLarge.blogSiteApp.blogService.Exception.ResourceNotFoundException;
import com.xLarge.blogSiteApp.blogService.Exception.UnauthorizedException;
import com.xLarge.blogSiteApp.blogService.Repository.BlogRepository;
import com.xLarge.blogSiteApp.blogService.Service.BlogService;
import com.xLarge.blogSiteApp.blogService.Util.BlogMapper;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;

    public BlogServiceImpl(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
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
}