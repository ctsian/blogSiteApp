package com.xLarge.blogSiteApp.userService.Service.impl;

import com.xLarge.blogSiteApp.userService.Entity.User;
import com.xLarge.blogSiteApp.userService.Repository.IUserRepository;
import com.xLarge.blogSiteApp.userService.Service.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserService implements UserDetailsService {

    private IUserRepository userRepository;

    public CustomUserService(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user=userRepository.findByUserName(username)
                .orElseThrow(()->new UsernameNotFoundException("user not found!"));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUserName())
                .password(user.getPassword())
                .authorities("USER")
                .build();
    }
}
