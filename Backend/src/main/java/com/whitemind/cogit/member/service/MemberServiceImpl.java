package com.whitemind.cogit.member.service;

import com.whitemind.cogit.common.S3.service.S3UploadService;
import com.whitemind.cogit.member.entity.Member;
import com.whitemind.cogit.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Service
public class MemberServiceImpl implements MemberService{
    private final MemberRepository memberRepository;
    private final S3UploadService s3UploadService;
    @Override
    public void modifyNickname(String memberNickname, HttpServletRequest request) {
        Member member = memberRepository.findMembersByMemberId((Integer) request.getAttribute("memberId"));
        member.updateNickname(memberNickname);
        memberRepository.save(member);
    }

    @Override
    public void modifyProfileImage(MultipartFile imageFile, HttpServletRequest request) throws IOException {
        Member member = memberRepository.findMembersByMemberId((Integer) request.getAttribute("memberId"));
        String imageUrl = s3UploadService.saveFile(imageFile);
        member.updateProfileImage(imageUrl);
        memberRepository.save(member);
    }
}
