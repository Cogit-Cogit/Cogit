package com.whitemind.cogit.code.service.implement;

import com.whitemind.cogit.code.dto.request.WriteCommentRequest;
import com.whitemind.cogit.code.entity.Code;
import com.whitemind.cogit.code.entity.Comment;
import com.whitemind.cogit.code.repository.CodeRepository;
import com.whitemind.cogit.code.repository.CommentRepository;
import com.whitemind.cogit.code.service.CommentService;
import com.whitemind.cogit.common.error.CustomException;
import com.whitemind.cogit.common.error.ExceptionCode;
import com.whitemind.cogit.member.entity.Member;
import com.whitemind.cogit.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentServiceImpl implements CommentService {

    private final CodeRepository codeRepository;
    private final MemberRepository memberRepository;
    private final CommentRepository commentRepository;
    @Override
    public void writeComment(WriteCommentRequest writeCommentRequest, HttpServletRequest request) {
        Code code = codeRepository.findById(writeCommentRequest.getCodeId())
                .orElseThrow(() -> new CustomException(ExceptionCode.NOT_EXIST_CODE_EXCEPTION));

        Member member = memberRepository.findMembersByMemberId((Integer) request.getAttribute("memberId"));

        Comment comment = Comment.builder()
                .code(code)
                .member(member)
                .commentContent(writeCommentRequest.getCommentContent())
                .commentLineNumber(writeCommentRequest.getCommentLineNumber())
                .build();

        commentRepository.save(comment);
    }
}
