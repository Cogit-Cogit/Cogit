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
@Table(name = "schedule", indexes = @Index(name="idx_team", columnList = "team_id"))
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int scheduleId;

    @Column(nullable = false, length = 50)
    private String scheduleName;

    private Date scheduleStartAt;

    private Date scheduleEndAt;

    @OneToMany(mappedBy = "schedule")
    private List<ScheduleAlgorithmQuest> scheduleAlgorithmQuestList;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Team team;

}
