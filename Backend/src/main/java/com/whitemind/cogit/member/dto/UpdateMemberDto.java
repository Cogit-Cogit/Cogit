package com.whitemind.cogit.member.dto;

import com.whitemind.cogit.member.entity.Member;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.ArrayList;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateMemberDto {

    private int memberId;

    private String memberGitUrl;

    private String memberName;

    private String memberRefreshToken;

    private String memberGitAvatarUrl;

    private String memberGitAccessToken;

    public void setMemberRefreshToken(String memberRefreshToken){
        this.memberRefreshToken = memberRefreshToken;
    }

    public Member toMemberEntity(){
        return Member.builder()
                .memberId(memberId)
                .memberGitUrl(memberGitUrl)
                .memberName(memberName)
                .memberRefreshToken(memberRefreshToken)
                .memberGitAvatarUrl(memberGitAvatarUrl)
                .memberGitAccessToken(memberGitAccessToken)
                .codeList(new ArrayList<>())
                .commentList(new ArrayList<>())
                .memberTeamList(new ArrayList<>())
                .memberAlgorithmQuestList(new ArrayList<>())
                .build();
    }
}
