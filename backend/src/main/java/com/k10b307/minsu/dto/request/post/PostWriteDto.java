package com.k10b307.minsu.dto.request.post;

import com.k10b307.minsu.entity.Post;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostWriteDto {

    private String title;
    private String content;

    public PostWriteDto(String title, String content) {
        this.title = title;
        this.content = content;
    }

    @Builder
    public static Post ofEntity(PostWriteDto dto) {
        return Post.builder()
                .title(dto.title)
                .content(dto.content)
                .build();
    }
}
