package com.whitemind.cogit.member.service;

import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public interface MemberService {
    void modifyNickname(String memberNickname, HttpServletRequest request);

    void modifyProfileImage(MultipartFile imageFile, HttpServletRequest request) throws IOException;
}
