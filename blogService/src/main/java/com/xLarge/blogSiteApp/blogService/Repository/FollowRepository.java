package com.xLarge.blogSiteApp.blogService.Repository;

import com.xLarge.blogSiteApp.blogService.Entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    long countByFollowed(String followed);

    boolean existsByFollowerAndFollowed(String follower, String followed);

    void deleteByFollowerAndFollowed(String follower, String followed);

    List<Follow> findByFollower(String follower);
}


