package com.whitemind.cogit.member.service;

import com.whitemind.cogit.common.entity.JWT;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface MemberService {
    void setToken(JWT jwt, HttpServletResponse response);

    void refreshGithubMember(String code, HttpServletResponse response) throws IOException;
}
