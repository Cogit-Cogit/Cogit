package com.whitemind.cogit.schedule.entity;

import javax.persistence.*;

@Entity
@Table(indexes = @Index(name="idx_schedule_algorithm_quest", columnList = "schedule_id, algorithm_quest_id, algorithm_quest_platform"))
public class ScheduleAlgorithmQuest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int scheduleProblemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Schedule schedule;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns(value = {
            @JoinColumn(name = "algorithm_quest_id", nullable = false),
            @JoinColumn(name = "algorithm_quest_platform", nullable = false)
    }, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private AlgorithmQuest algorithmQuest;
}
