package com.whitemind.cogit.member.controller;

import com.whitemind.cogit.auth.service.GithubService;
import com.whitemind.cogit.common.response.ResponseResult;
import com.whitemind.cogit.common.response.SingleResponseResult;
import com.whitemind.cogit.member.dto.Member;
import com.whitemind.cogit.member.repository.MemberRepository;
import com.whitemind.cogit.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {
    private final MemberService memberService;
    @GetMapping("/github")
    public ResponseResult refreshMemberRequest(@RequestParam String code, HttpServletResponse response) throws Exception {
        log.info("getAccessTokenRequest | Member Github AccessToken 갱신");
        memberService.refreshGithubMember(code, response);
        // TODO: 무슨 값을 리턴할지???
        return new SingleResponseResult<>("OK");
    }
}
