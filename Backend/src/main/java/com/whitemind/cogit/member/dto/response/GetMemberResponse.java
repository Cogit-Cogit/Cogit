package com.whitemind.cogit.member.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class GetMemberResponse {
    private int memberId;

    private String memberGitUrl;

    private String memberName;

    private String memberNickname;

    private String memberProfileImage;
}
