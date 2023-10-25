package com.whitemind.cogit.member.service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface MemberService {
    void setToken(Long memberId , HttpServletResponse response);

    void refreshGithubMember(String code, HttpServletResponse response) throws IOException;
}
