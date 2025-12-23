package com.xLarge.blogSiteApp.blogService.Repository;

import com.xLarge.blogSiteApp.blogService.Entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, Long> {

    List<Blog> findByAuthor(String author);

    List<Blog> findByCategoryIgnoreCase(String category);

    List<Blog> findTop50ByOrderByLikesDescCreatedAtDesc();

    List<Blog> findByAuthorInOrderByCreatedAtDesc(Collection<String> authors);
}