package com.whitemind.cogit.member.dto.request;

import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
public class UpdateMemberImageRequest {
    private MultipartFile imageFile;
}
