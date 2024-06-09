package com.k10b307.minsu.service;

import com.k10b307.minsu.common.exception.ResourceNotFoundException;
import com.k10b307.minsu.dto.request.comment.CommentDto;
import com.k10b307.minsu.dto.response.comment.ResCommentDto;
import com.k10b307.minsu.entity.Comment;
import com.k10b307.minsu.entity.Post;
import com.k10b307.minsu.entity.User;
import com.k10b307.minsu.repository.CommentRepository;
import com.k10b307.minsu.repository.PostRepository;
import com.k10b307.minsu.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public Page<ResCommentDto> getAllComments(Pageable pageable, Long postId) {
        Page<Comment> comments = commentRepository.findAllWithUserAndBoard(pageable, postId);
        List<ResCommentDto> commentList = comments.getContent().stream()
                .map(ResCommentDto::fromEntity)
                .collect(Collectors.toList());
        return new PageImpl<>(commentList, pageable, comments.getTotalElements());
    }

    public ResCommentDto write(Long postId, User user, CommentDto writeDto) {
        // board 정보 검색
        Post post = postRepository.findById(postId).orElseThrow(
                () -> new ResourceNotFoundException("Post", "Post id", String.valueOf(postId))
        );
        // member(댓글 작성자) 정보 검색
        User commentWriter = userRepository.findById(user.getId()).orElseThrow(
                () -> new ResourceNotFoundException("User", "User id", String.valueOf(user.getId()))
        );
        // Entity 변환, 연관관계 매핑
        Comment comment = CommentDto.ofEntity(writeDto);
        comment.setPost(post);
        comment.setUser(commentWriter);

        Comment saveComment = commentRepository.save(comment);
        return ResCommentDto.fromEntity(saveComment);
    }

    public ResCommentDto update(Long commentId, CommentDto commentDto) {
        Comment comment = commentRepository.findByIdWithUserAndBoard(commentId).orElseThrow(
                () -> new ResourceNotFoundException("Comment", "Comment Id", String.valueOf(commentId))
        );
        comment.update(commentDto.getContent());
        return ResCommentDto.fromEntity(comment);
    }

    public void delete(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}
