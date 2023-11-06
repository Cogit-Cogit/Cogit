package com.whitemind.cogit.code.service;

import com.whitemind.cogit.code.dto.request.WriteCommentRequest;

import javax.servlet.http.HttpServletRequest;

public interface CommentService {
    void writeComment(WriteCommentRequest writeCommentRequest, HttpServletRequest request);
}
