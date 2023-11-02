package com.whitemind.cogit.member.dto;

import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
public class UpdateMemberImageDto {
    private MultipartFile imageFile;
}
