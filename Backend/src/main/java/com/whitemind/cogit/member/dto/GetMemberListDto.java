package com.whitemind.cogit.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class GetMemberListDto {
    private int memberId;

    private String memberGitUrl;

    private String memberName;

    private String memberNickname;

    private String memberProfileImage;
}
