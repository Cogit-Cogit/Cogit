package com.whitemind.cogit.code.repository;

import com.whitemind.cogit.code.entity.Code;
import com.whitemind.cogit.code.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByCode(Code code);
}
