package com.whitemind.cogit.code.entity;

import com.whitemind.cogit.common.entity.BaseEntity;
import com.whitemind.cogit.member.entity.Member;
import com.whitemind.cogit.schedule.entity.Problem;
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
@Table(name = "code")
public class Code extends BaseEntity {
    @EmbeddedId
    private CodeCompositeKey codeCompositeKey;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Member member;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "problem_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT)),
            @JoinColumn(name = "problem_type", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    })
    private Problem problem;

    @OneToMany(mappedBy = "code")
    private List<Comment> commentList;

    private String codeContent;
}
