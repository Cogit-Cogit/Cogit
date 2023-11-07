package com.whitemind.cogit.member.controller;

import com.whitemind.cogit.common.response.ListResponseResult;
import com.whitemind.cogit.common.response.ResponseResult;
import com.whitemind.cogit.member.dto.request.UpdateMemberNicknameRequest;
import com.whitemind.cogit.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;
    @PatchMapping("/nickname")
    public ResponseResult refreshUpdateMemberNicknameRequest(@RequestBody UpdateMemberNicknameRequest updateMemberNicknameRequest, HttpServletRequest request) throws Exception {
        log.info("refreshModifyMemberNicknameRequest | Member Nickname 변경 요청");
        memberService.modifyNickname(updateMemberNicknameRequest.getMemberNickname(), request);
        return ResponseResult.successResponse;
    }

    @PatchMapping("/image")
    public ResponseResult refreshUpdateMemberImageRequest(@RequestParam MultipartFile imageFile, HttpServletRequest request) throws Exception {
        log.info("refreshUpdateMemberImageRequest | Member ProfileImage 변경 요청");
        memberService.modifyProfileImage(imageFile, request);
        return ResponseResult.successResponse;
    }

    @GetMapping("/list")
    public ListResponseResult getMemberListRequest() {
        log.info("getMemberListRequest | Member 전체 리스트 조회");
        return new ListResponseResult(memberService.getMemberList());
    }
}
