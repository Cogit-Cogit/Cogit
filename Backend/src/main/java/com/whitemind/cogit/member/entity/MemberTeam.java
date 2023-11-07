package com.whitemind.cogit.member.entity;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder(toBuilder = true)
@Table(indexes = @Index(name="idx_member_team", columnList = "member_id, team_id"))
public class MemberTeam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberTeamId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Team team;

    @Enumerated(EnumType.STRING)
    @Column(name="member_team_role")
    private MemberTeamRole memberTeamRole;

    private int memberTeamRankTime;

    private int memberTeamQuestCount;

    public void addSovledQuest(LocalDate startAt){
        this.memberTeamQuestCount++;

        // 두 날짜와 시간 사이의 차이 계산
        Duration duration = Duration.between(startAt.atTime(LocalTime.MIN), LocalDateTime.now());

        // 분 단위 차이 계산
        long diffInMinutes = Math.abs(duration.toMinutes());

        // 10분 간격으로 1점씩 적립
        int points = (int) (diffInMinutes / 10);

        this.memberTeamRankTime += points;
    }
}
