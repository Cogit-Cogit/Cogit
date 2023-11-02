package com.whitemind.cogit.auth.service;

import com.whitemind.cogit.common.entity.JWT;
import com.whitemind.cogit.common.jwt.JwtService;
import com.whitemind.cogit.member.dto.UpdateMemberDto;
import com.whitemind.cogit.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Service
public class AuthServiceImpl implements AuthService{
    private final JwtService jwtService;
    private final GithubService githubService;
    private final MemberRepository memberRepository;

    @Override
    public void setToken(JWT jwt, HttpServletResponse response) {
        log.info("UserServiceImpl_setToken | 사용자 인증 완료 , 토큰 부여");
        response.setHeader("Authorization", "Bearer " + jwt.getAccessToken());
        response.setHeader("RefreshToken", "Bearer " + jwt.getRefreshToken());
    }

    @Override
    public void refreshGithubMember(String code, HttpServletResponse response) throws IOException {
        log.info("UserServiceImple_refreshGithubMember | 사용자 정보 추가 or 갱신");
        String accessToken = githubService.getAccessToken(code);
        UpdateMemberDto updateMemberDto = githubService.getGithubUserInfo(accessToken);
        JWT jwt = jwtService.createAccessToken("memberId",updateMemberDto.getMemberId()); // key, value
        updateMemberDto.setMemberRefreshToken(jwt.getRefreshToken());
        memberRepository.save(updateMemberDto.toMemberEntity());
        setToken(jwt, response);
    }
}
