package com.whitemind.cogit.schedule.entity;

import javax.persistence.*;

@Entity
public class ScheduleProblem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int scheduleProblemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "problem_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT)),
            @JoinColumn(name = "problem_type", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    })

    private Problem problem;
}
