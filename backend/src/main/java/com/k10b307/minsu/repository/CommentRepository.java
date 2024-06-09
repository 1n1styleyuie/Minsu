package com.k10b307.minsu.repository;

import com.k10b307.minsu.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query(value = "SELECT c FROM Comment c JOIN FETCH c.user JOIN FETCH c.post b WHERE b.id = :postId")
    Page<Comment> findAllWithUserAndBoard(Pageable pageable, Long postId);

    @Query(value = "SELECT c FROM Comment c JOIN FETCH c.user m JOIN FETCH c.post b WHERE c.id = :commentId")
    Optional<Comment> findByIdWithUserAndBoard(Long commentId);
}
