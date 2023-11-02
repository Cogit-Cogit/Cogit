package com.whitemind.cogit.auth.service;

import com.whitemind.cogit.common.entity.JWT;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface AuthService {
    void setToken(JWT jwt, HttpServletResponse response);

    void refreshGithubMember(String code, HttpServletResponse response) throws IOException;
}
