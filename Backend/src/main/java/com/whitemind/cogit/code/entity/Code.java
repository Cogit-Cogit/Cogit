package com.whitemind.cogit.code.entity;

import com.whitemind.cogit.common.entity.BaseEntity;
import com.whitemind.cogit.member.entity.Member;
import com.whitemind.cogit.schedule.entity.AlgorithmQuest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder(toBuilder = true)
@Table(name = "code", indexes = @Index(name = "idx_algorithm_quest_member", columnList = "algorithm_quest_id, algorithm_quest_platform, member_id"))
public class Code extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int codeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns(value = {
            @JoinColumn(name = "algorithm_quest_id", nullable = false),
            @JoinColumn(name = "algorithm_quest_platform", nullable = false)
    }, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private AlgorithmQuest algorithmQuest;

    @OneToMany(mappedBy = "code")
    private List<Comment> commentList;

    @Column(nullable = false)
    private String codeContent;

    @Column(nullable = false)
    private String codeAnalyze;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Language language;

    @Column(nullable = false)
    private float codeRunningTime;

    @Column(nullable = false)
    private boolean codeSolved;
}
