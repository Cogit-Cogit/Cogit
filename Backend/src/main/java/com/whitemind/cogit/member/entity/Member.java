package com.whitemind.cogit.member.entity;

import com.sun.istack.NotNull;
import com.whitemind.cogit.code.entity.Code;
import com.whitemind.cogit.code.entity.Comment;
import com.whitemind.cogit.common.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@DynamicInsert
@SuperBuilder(toBuilder = true)
@Table(name = "member")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberId;

    @Column(nullable = false, length = 320)
    private String memberGitUrl;

    @Column(nullable = false, length = 20)
    private String memberName;

    private String memberRefreshToken;

    private String memberProfileImage;

    private String memberGitAccessToken;

    @Column(nullable = false, length = 20)
    private String memberNickname;

    @OneToMany(mappedBy = "member")
    private List<Code> codeList;

    @OneToMany(mappedBy = "member")
    private List<Comment> commentList;

    @OneToMany(mappedBy = "member")
    private List<MemberTeam> memberTeamList;

    @OneToMany(mappedBy = "member")
    private List<MemberAlgorithmQuest> memberAlgorithmQuestList;


    //닉네임 수정
    public void updateNickname(String memberName) {
        this.memberName = memberName;
    }
}
