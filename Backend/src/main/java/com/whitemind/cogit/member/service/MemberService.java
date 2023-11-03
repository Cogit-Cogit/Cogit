package com.whitemind.cogit.member.service;

import com.whitemind.cogit.member.dto.response.GetMemberResponse;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

public interface MemberService {
    void modifyNickname(String memberNickname, HttpServletRequest request);

    void modifyProfileImage(MultipartFile imageFile, HttpServletRequest request) throws IOException;

    List<GetMemberResponse> getMemberList();
}
