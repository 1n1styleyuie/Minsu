package com.k10b307.minsu.entity;

import com.k10b307.minsu.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Comment extends BaseTimeEntity {

    @Id
    @GeneratedValue
    @Column(name = "COMMENT_ID")
    private Long id;

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    public User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "POST_ID")
    public Post post;

    @Builder
    public Comment(Long id, String content, User user, Post post) {
        this.id = id;
        this.content = content;
        this.user = user;
        this.post = post;
    }

    // Board와의 다대일(N:1) 관계를 설정하는 메소드
    public void setPost(Post post) {
        this.post = post;
        post.getComments().add(this); // Board 엔티티에도 Comment를 추가합니다.
    }

    // Member와의 다대일(N:1) 관계를 설정하는 메소드
    public void setUser(User user) {
        this.user = user;
        user.getComments().add(this); // Member 엔티티에도 Comment를 추가합니다.
    }

    // update
    public void update(String content) {
        this.content = content;
    }
}
