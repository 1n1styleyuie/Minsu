package com.k10b307.minsu.controller;

import com.k10b307.minsu.dto.request.comment.CommentDto;
import com.k10b307.minsu.dto.response.comment.ResCommentDto;
import com.k10b307.minsu.entity.User;
import com.k10b307.minsu.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/post/{postId}/comment")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/list")
    public ResponseEntity<Page<ResCommentDto>> commentList(
            @PathVariable Long postId,
            @PageableDefault(size = 5, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {

        Page<ResCommentDto> commentList = commentService.getAllComments(pageable, postId);
        return ResponseEntity.status(HttpStatus.OK).body(commentList);
    }

    @PostMapping("/write")
    public ResponseEntity<ResCommentDto> write(
            @AuthenticationPrincipal User user,
            @PathVariable Long postId,
            @RequestBody CommentDto commentDto) {

        ResCommentDto saveCommentDTO = commentService.write(postId, user, commentDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saveCommentDTO);
    }

    @PatchMapping("/update/{commentId}")
    public ResponseEntity<ResCommentDto> update(
            @PathVariable Long commentId,
            @RequestBody CommentDto commentDto) {

        ResCommentDto updateCommentDTO = commentService.update(commentId, commentDto);
        return ResponseEntity.status(HttpStatus.OK).body(updateCommentDTO);
    }

    @DeleteMapping("/delete/{commentId}")
    public ResponseEntity<Long> delete(@PathVariable Long commentId) {

        commentService.delete(commentId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
