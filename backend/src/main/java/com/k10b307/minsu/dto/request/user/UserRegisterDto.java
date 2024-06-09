package com.k10b307.minsu.dto.request.user;

import com.k10b307.minsu.common.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.k10b307.minsu.entity.User;

@Getter
@Setter
@NoArgsConstructor
public class UserRegisterDto {

    private String email;
    private String password;
    private String passwordCheck;
    private String username;

    @Builder
    public UserRegisterDto(String email, String password, String passwordCheck, String username) {
        this.email = email;
        this.password = password;
        this.passwordCheck = passwordCheck;
        this.username = username;
    }

    // DTO -> Entity
    public static User ofEntity(UserRegisterDto dto) {
        return User.builder()
                .email(dto.getEmail())
                .password(dto.getPassword())
                .username(dto.getUsername())
                .roles(Role.USER)
                .build();
    }
}
