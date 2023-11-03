package com.whitemind.cogit.schedule.entity;

import com.whitemind.cogit.code.entity.Code;
import com.whitemind.cogit.common.entity.BaseEntity;
import com.whitemind.cogit.member.entity.MemberAlgorithmQuest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder(toBuilder = true)
@Table(name = "algorithm_quest")
public class AlgorithmQuest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int algorithmQuestId;

    @Column(nullable = false)
    private int algorithmQuestNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AlgorithmQuestPlatform algorithmQuestPlatform;

    @Column(nullable = false, length = 512)
    private String algorithmQuestUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_Id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Schedule schedule;

    @OneToMany(mappedBy = "algorithmQuest")
    private List<Code> codeList;

    @OneToMany(mappedBy = "algorithmQuest")
    private List<MemberAlgorithmQuest> memberAlgorithmQuestList;

}
