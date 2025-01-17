package com.k10b307.minsu.controller;

import com.k10b307.minsu.dto.request.post.PostUpdateDto;
import com.k10b307.minsu.dto.request.post.PostWriteDto;
import com.k10b307.minsu.dto.request.post.SearchData;
import com.k10b307.minsu.dto.response.post.ResPostDetailsDto;
import com.k10b307.minsu.dto.response.post.ResPostListDto;
import com.k10b307.minsu.dto.response.post.ResPostWriteDto;
import com.k10b307.minsu.entity.User;
import com.k10b307.minsu.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@RequestMapping("/api/post")
@RequiredArgsConstructor
@Slf4j
public class PostController {

    private final PostService postService;

    // 페이징 목록
    @GetMapping("/list")
    public ResponseEntity<Page<ResPostListDto>> postList(
            @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<ResPostListDto> listDTO = postService.getAllPosts(pageable);
        return ResponseEntity.status(HttpStatus.OK).body(listDTO);
    }

    // 페이징 검색 , Get 요청 @RequestBody 사용할 수 없음
    @GetMapping("/search")
    public ResponseEntity<Page<ResPostListDto>> search(
            @PageableDefault(size = 5, sort = "id", direction = Sort.Direction.DESC) Pageable pageable,
            @RequestParam String title,
            @RequestParam String content,
            @RequestParam String writerName) {
        SearchData searchData = SearchData.createdSearchData(title, content, writerName);
        Page<ResPostListDto> searchBoard = postService.search(searchData, pageable);
        return  ResponseEntity.status(HttpStatus.OK).body(searchBoard);
    }

    @PostMapping("/write")
    public ResponseEntity<ResPostWriteDto> write(
            @RequestBody PostWriteDto postDTO,
            @AuthenticationPrincipal User user) {
        Thread currentThread = Thread.currentThread();
        log.info("현재 실행 중인 스레드: " + currentThread.getName());
        ResPostWriteDto savePostDTO = postService.write(postDTO, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savePostDTO);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<ResPostDetailsDto> detail(@PathVariable("postId") Long postId) {
        ResPostDetailsDto findPostDTO = postService.detail(postId);
        return ResponseEntity.status(HttpStatus.OK).body(findPostDTO);
    }

    // 상세보기 -> 수정
    @PatchMapping("/{postId}/update")
    public ResponseEntity<ResPostDetailsDto> update(
            @PathVariable Long postId,
            @RequestBody PostUpdateDto postDTO) {
        ResPostDetailsDto updatePostDTO = postService.update(postId, postDTO);
        return ResponseEntity.status(HttpStatus.OK).body(updatePostDTO);
    }

    // 상세보기 -> 삭제
    @DeleteMapping("/{postId}/delete")
    public ResponseEntity<Long> delete(@PathVariable Long postId) {
        postService.delete(postId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
