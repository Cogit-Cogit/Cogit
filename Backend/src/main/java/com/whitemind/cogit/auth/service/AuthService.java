package com.whitemind.cogit.auth.service;

import com.whitemind.cogit.common.entity.JWT;
import com.whitemind.cogit.member.dto.response.GetMemberResponse;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface AuthService {
    void setToken(JWT jwt, HttpServletResponse response);

    GetMemberResponse refreshGithubMember(String code, HttpServletResponse response) throws IOException;
}
