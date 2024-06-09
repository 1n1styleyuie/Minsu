package com.k10b307.minsu.dto.request.user;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserLoginDto {

    private String email;
    private String password;

    @Builder
    public UserLoginDto(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
