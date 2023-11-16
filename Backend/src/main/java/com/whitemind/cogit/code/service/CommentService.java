package com.whitemind.cogit.code.service;

import com.whitemind.cogit.code.dto.request.WriteCommentRequest;
import com.whitemind.cogit.code.dto.response.GetCommentResponse;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface CommentService {
    void writeComment(WriteCommentRequest writeCommentRequest, HttpServletRequest request);

    List<GetCommentResponse> getCommentList(int codeId);
}
