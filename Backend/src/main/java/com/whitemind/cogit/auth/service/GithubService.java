package com.whitemind.cogit.auth.service;

import com.whitemind.cogit.member.dto.UpdateMemberDto;
import com.whitemind.cogit.member.entity.Member;

import java.io.IOException;
import java.net.MalformedURLException;

public interface GithubService {
    public UpdateMemberDto getGithubUserInfo(String accessToken) throws IOException;
    public String getAccessToken(String code) throws IOException;
}
