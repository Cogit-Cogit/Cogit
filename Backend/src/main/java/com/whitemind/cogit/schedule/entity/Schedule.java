package com.whitemind.cogit.schedule.entity;

import com.whitemind.cogit.common.entity.BaseEntity;
import com.whitemind.cogit.member.entity.Team;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@SuperBuilder(toBuilder = true)
@Table(name = "schedule")
public class Schedule extends BaseEntity {
    @Id
    private int scheduleId;

    private String scheduleName;

    private Date scheduleStartAt;

    private Date scheduleEndAt;

    @OneToMany(mappedBy = "schedule")
    private List<ScheduleProblem> scheduleProblemList;

    @OneToMany(mappedBy = "schedule")
    private List<Subject> subjectList;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Team team;

}
