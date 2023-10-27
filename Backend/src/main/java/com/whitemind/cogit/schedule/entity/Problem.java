package com.whitemind.cogit.schedule.entity;

import com.whitemind.cogit.code.entity.Code;
import com.whitemind.cogit.code.entity.Comment;
import com.whitemind.cogit.common.entity.BaseEntity;
import com.whitemind.cogit.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@SuperBuilder(toBuilder = true)
@Table(name = "problem")
public class Problem extends BaseEntity {
    @EmbeddedId
    private ProblemCompositeKey problemCompositeKey;

    @OneToMany(mappedBy = "problem")
    private List<Code> codeList;

    @OneToMany(mappedBy = "problem")
    private List<ScheduleProblem> scheduleProblemList;

    private String problemUrl;
}
