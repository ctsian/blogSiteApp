package com.xLarge.blogSiteApp.userService.Repository;

import com.xLarge.blogSiteApp.userService.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IUserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmailId(String email);
    Optional<User> findByUserName(String userName);

    Boolean existsByEmailId(String email);
    Boolean existsByUserName(String userName);

}
