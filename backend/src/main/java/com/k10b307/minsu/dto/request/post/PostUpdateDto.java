package com.k10b307.minsu.dto.request.post;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostUpdateDto {

    private String title;
    private String content;

    @Builder
    public PostUpdateDto(String title, String content, String category) {
        this.title = title;
        this.content = content;
    }
}
