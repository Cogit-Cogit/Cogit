package com.whitemind.cogit.member.entity;

import com.whitemind.cogit.schedule.entity.AlgorithmQuest;

import javax.persistence.*;

@Entity
@Table(indexes = @Index(name="idx_member_algorithm_quest", columnList = "member_id, algorithm_quest_id"))
public class MemberAlgorithmQuest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberAlgorithmQuestId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "algorithm_quest_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private AlgorithmQuest algorithmQuest;

    @Column(nullable = false)
    private boolean memberAlgorithmQuestSolved;
}
