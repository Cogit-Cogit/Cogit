package com.whitemind.cogit.schedule.entity;

import com.whitemind.cogit.member.entity.Team;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@SuperBuilder(toBuilder = true)
@Table(name = "schedule")
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int scheduleId;

    @Column(nullable = false, length = 50)
    private String scheduleName;

    private LocalDate scheduleStartAt;

    private LocalDate scheduleEndAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Team team;
}
