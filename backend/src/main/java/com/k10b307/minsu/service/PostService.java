package com.k10b307.minsu.service;

import com.k10b307.minsu.common.exception.ResourceNotFoundException;
import com.k10b307.minsu.dto.request.post.PostUpdateDto;
import com.k10b307.minsu.dto.request.post.PostWriteDto;
import com.k10b307.minsu.dto.request.post.SearchData;
import com.k10b307.minsu.dto.response.post.ResPostDetailsDto;
import com.k10b307.minsu.dto.response.post.ResPostListDto;
import com.k10b307.minsu.dto.response.post.ResPostWriteDto;
import com.k10b307.minsu.entity.Post;
import com.k10b307.minsu.entity.User;
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
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    // 페이징 리스트
    public Page<ResPostListDto> getAllPosts(Pageable pageable) {
        Page<Post> posts = postRepository.findAllWithUserAndComments(pageable);
        List<ResPostListDto> list = posts.getContent().stream()
                .map(ResPostListDto::fromEntity)
                .collect(Collectors.toList());
        return new PageImpl<>(list, pageable, posts.getTotalElements());
    }

    // 게시글 검색, isEmpty() == ""
    public Page<ResPostListDto> search(SearchData searchData, Pageable pageable) {
        Page<Post> result = null;
        if (!searchData.getTitle().isEmpty()) {
            result = postRepository.findAllTitleContaining(searchData.getTitle(), pageable);
        } else if (!searchData.getContent().isEmpty()) {
            result = postRepository.findAllContentContaining(searchData.getContent(), pageable);
        } else if (!searchData.getWriterName().isEmpty()) {
            result = postRepository.findAllUsernameContaining(searchData.getWriterName(), pageable);
        }
        List<ResPostListDto> list = result.getContent().stream()
                .map(ResPostListDto::fromEntity)
                .collect(Collectors.toList());
        return new PageImpl<>(list, pageable, result.getTotalElements());
    }

    // 게시글 등록
    public ResPostWriteDto write(PostWriteDto postDTO, User user) {

        Post post = PostWriteDto.ofEntity(postDTO);
        User writerUser = userRepository.findByEmail(user.getEmail()).orElseThrow(
                () -> new ResourceNotFoundException("User", "User Email", user.getEmail())
        );
        post.setMappingUser(writerUser);
        Post savePost = postRepository.save(post);
        return ResPostWriteDto.fromEntity(savePost, writerUser.getUsername());
    }

    // 게시글 상세보기
    public ResPostDetailsDto detail(Long postId) {
        Post findPost = postRepository.findByIdWithUserAndCommentsAndFiles(postId).orElseThrow(
                () -> new ResourceNotFoundException("Post", "Post Id", String.valueOf(postId))
        );
        // 조회수 증가
        findPost.upViewCount();
        return ResPostDetailsDto.fromEntity(findPost);
    }

    // 게시글 수정
    public ResPostDetailsDto update(Long postId, PostUpdateDto postDTO) {
        Post updatePost = postRepository.findByIdWithUserAndCommentsAndFiles(postId).orElseThrow(
                () -> new ResourceNotFoundException("Post", "Post Id", String.valueOf(postId))
        );
        updatePost.update(postDTO.getTitle(), postDTO.getContent());
        return ResPostDetailsDto.fromEntity(updatePost);
    }

    // 게시글 삭제
    public void delete(Long postId) {
        postRepository.deleteById(postId);
    }
}
