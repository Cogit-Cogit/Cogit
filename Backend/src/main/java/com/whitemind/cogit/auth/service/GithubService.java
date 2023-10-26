package com.whitemind.cogit.auth.service;

import com.whitemind.cogit.member.dto.Member;

import java.io.IOException;
import java.net.MalformedURLException;

public interface GithubService {
    public Member getGithubUserInfo(String accessToken) throws IOException;
    public String getAccessToken(String code) throws IOException;
}
