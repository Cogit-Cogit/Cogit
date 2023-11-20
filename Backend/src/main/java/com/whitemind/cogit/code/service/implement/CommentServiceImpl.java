package com.whitemind.cogit.code.service.implement;

import com.whitemind.cogit.code.dto.request.WriteCommentRequest;
import com.whitemind.cogit.code.dto.response.GetCommentResponse;
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
import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    public List<GetCommentResponse> getCommentList(int codeId) {
        List<Comment> commentList = commentRepository.findByCode(codeRepository.findById(codeId)
                .orElseThrow(() -> new CustomException(ExceptionCode.NOT_EXIST_CODE_EXCEPTION)));

        return commentList.stream().map(comment -> GetCommentResponse.builder()
                .commentId(comment.getCommentId())
                .memberId(comment.getMember().getMemberId())
                .memberNickname(comment.getMember().getMemberNickname())
                .memberProfileImage(comment.getMember().getMemberProfileImage())
                .commentLineNumber(comment.getCommentLineNumber())
                .commentContent(comment.getCommentContent())
                .createAt(comment.getCreatedAt())
                .build()).collect(Collectors.toList());
    }
}
