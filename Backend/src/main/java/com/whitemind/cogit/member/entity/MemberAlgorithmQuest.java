package com.whitemind.cogit.member.entity;

import com.whitemind.cogit.schedule.entity.Problem;

import javax.persistence.*;

@Entity
public class MemberAlgorithmQuest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberTeamId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "problem_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT)),
            @JoinColumn(name = "problem_type", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    })
    private Problem problem;
}
