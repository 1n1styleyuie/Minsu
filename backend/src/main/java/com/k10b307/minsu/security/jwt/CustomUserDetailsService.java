package com.k10b307.minsu.security.jwt;

import com.k10b307.minsu.common.exception.ResourceNotFoundException;
import com.k10b307.minsu.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.userRepo.findByEmail(username).orElseThrow(
                () -> new ResourceNotFoundException("User", "User Email : ", username));
    }
}
