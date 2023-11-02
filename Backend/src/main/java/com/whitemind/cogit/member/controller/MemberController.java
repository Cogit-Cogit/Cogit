package com.whitemind.cogit.member.controller;

import com.nimbusds.oauth2.sdk.http.HTTPResponse;
import com.whitemind.cogit.common.response.ResponseResult;
import com.whitemind.cogit.common.response.SingleResponseResult;
import com.whitemind.cogit.member.dto.UpdateMemberImageDto;
import com.whitemind.cogit.member.dto.UpdateMemberNicknameDto;
import com.whitemind.cogit.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;
    @PatchMapping("/nickname")
    public ResponseResult refreshUpdateMemberNicknameRequest(@RequestBody UpdateMemberNicknameDto updateMemberNicknameDto, HttpServletRequest request) throws Exception {
        log.info("refreshModifyMemberNicknameRequest | Member Nickname 변경 요청");
        memberService.modifyNickname(updateMemberNicknameDto.getMemberNickname(), request);
        return new SingleResponseResult<>(HTTPResponse.SC_OK);
    }

    @PatchMapping("/image")
    public ResponseResult refreshUpdateMemberImageRequest(@RequestParam MultipartFile imageFile, HttpServletRequest request) throws Exception {
        log.info("refreshUpdateMemberImageRequest | Member ProfileImage 변경 요청");
        memberService.modifyProfileImage(imageFile, request);
        return new SingleResponseResult<>(HTTPResponse.SC_OK);
    }
}
