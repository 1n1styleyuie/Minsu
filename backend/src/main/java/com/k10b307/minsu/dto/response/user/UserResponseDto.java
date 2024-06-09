package com.k10b307.minsu.dto.response.user;

import com.k10b307.minsu.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserResponseDto {
    // 사용자 DB 인덱스 값을 굳이 사용자에게 노출시킬 필요는 없다고 생각
    private String email;
    private String username;

    @Builder
    public UserResponseDto(String email, String username) {
        this.email = email;
        this.username = username;
    }

    // Entity -> DTO
    public static UserResponseDto fromEntity(User user) {
        return UserResponseDto.builder()
                .email(user.getEmail())
                .username(user.getUsername())
                .build();
    }
}
