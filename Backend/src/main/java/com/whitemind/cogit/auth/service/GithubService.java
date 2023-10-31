package com.whitemind.cogit.auth.service;

import com.whitemind.cogit.code.dto.request.CodeRequest;
import com.whitemind.cogit.member.dto.UpdateMemberDto;
import com.whitemind.cogit.member.entity.Member;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.MalformedURLException;

public interface GithubService {
    UpdateMemberDto getGithubUserInfo(String accessToken) throws IOException;
    String getAccessToken(String code) throws IOException;
    void uploadGitCode(CodeRequest code, HttpServletRequest request) throws Exception;
    boolean getMemberRepo(Member member) throws IOException;
}
