package com.whitemind.cogit.member.entity;

import com.whitemind.cogit.common.entity.BaseEntity;
import com.whitemind.cogit.schedule.entity.Schedule;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@SuperBuilder(toBuilder = true)
@Table(name = "team")
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int teamId;

    @Column(nullable = false, length = 20)
    private String teamName;

    @Column(nullable = false, length = 320)
    private String teamRepositoryUrl;

    // 연결 테이블(MEMBER_PRODUCT)쪽이 외래키를 갖고있기 때문에, 연결 테이블이 연관관계의 주인이다.
    @OneToMany(mappedBy = "team")
    private List<MemberTeam> memberTeamList;

    @OneToMany(mappedBy = "team")
    private List<Schedule> scheduleList;
}
