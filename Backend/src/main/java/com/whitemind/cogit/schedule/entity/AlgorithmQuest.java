package com.whitemind.cogit.schedule.entity;

import com.whitemind.cogit.code.entity.Code;
import com.whitemind.cogit.common.entity.BaseEntity;
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
    @EmbeddedId
    private AlgorithmQuestCompositeKey algorithmQuestCompositeKey;

    @OneToMany(mappedBy = "algorithmQuest")
    private List<Code> codeList;

    @OneToMany(mappedBy = "algorithmQuest")
    private List<ScheduleAlgorithmQuest> scheduleAlgorithmQuestList;

    @Column(nullable = false, length = 512)
    private String algorithmQuestUrl;
}
