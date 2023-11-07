package com.whitemind.cogit.auth.controller;

import com.nimbusds.oauth2.sdk.http.HTTPResponse;
import com.whitemind.cogit.auth.service.AuthService;
import com.whitemind.cogit.common.response.ResponseResult;
import com.whitemind.cogit.common.response.SingleResponseResult;
import com.whitemind.cogit.common.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.HTTP;
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
public class AuthContoller {

    private final AuthService authService;
    private final JwtService jwtService;

    @GetMapping("/regist")
    public ResponseResult refreshMemberRequest(@RequestParam String code, HttpServletResponse response) throws Exception {
        log.info("getAccessTokenRequest | Member Github AccessToken 갱신");
        authService.refreshGithubMember(code, response);
        return ResponseResult.successResponse;
    }

    @GetMapping("/refresh")
    public ResponseResult refreshJWTRequest(HttpServletRequest request, HttpServletResponse response) {
        log.info("getAccessTokenRequest | Member AccessToken 갱신");
        authService.setToken(jwtService.refreshAccessToken(request.getHeader("refreshToken")), response);
        return ResponseResult.successResponse;
    }
}
