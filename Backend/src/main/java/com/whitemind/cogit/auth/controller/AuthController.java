package com.whitemind.cogit.auth.controller;

import com.whitemind.cogit.auth.service.AuthService;
import com.whitemind.cogit.common.response.ResponseResult;
import com.whitemind.cogit.common.jwt.JwtService;
import com.whitemind.cogit.common.response.SingleResponseResult;
import com.whitemind.cogit.member.dto.response.GetMemberResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    @GetMapping("/regist")
    public SingleResponseResult refreshMemberRequest(@RequestParam String code, HttpServletResponse response) throws Exception {
        log.info("getAccessTokenRequest | Member Github AccessToken 갱신");
        return new SingleResponseResult<GetMemberResponse>(authService.refreshGithubMember(code, response));
    }

    @GetMapping("/refresh")
    public ResponseResult refreshJWTRequest(HttpServletRequest request, HttpServletResponse response) {
        log.info("getAccessTokenRequest | Member AccessToken 갱신");
        authService.setToken(jwtService.refreshAccessToken(request.getHeader("refreshToken")), response);
        return ResponseResult.successResponse;
    }
}
