package com.xLarge.blogSiteApp.blogService.Util;

import com.xLarge.blogSiteApp.blogService.DTO.BlogResponse;
import com.xLarge.blogSiteApp.blogService.Entity.Blog;

public class BlogMapper {

    private BlogMapper() {}

    public static BlogResponse toResponse(Blog blog) {
        return new BlogResponse(
                blog.getId(),
                blog.getTitle(),
                blog.getContent(),
                blog.getAuthor(),
                blog.getCreatedAt()
        );
    }
}
