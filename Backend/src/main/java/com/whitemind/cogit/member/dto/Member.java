package com.whitemind.cogit.member.dto;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "member" , schema = "cogit")
public class Member implements Serializable {
    @Id
    @Column(name="member_id")
    private long memberId;

    @Column(name="member_email")
    private String memberEmail;

    @Column(name="member_name")
    private String memberName;

    @Column(name="member_refresh_token")
    private String memberRefreshToken;

    @Column(name="member_git_access_token")
    private String memberGitAccessToken;
}
