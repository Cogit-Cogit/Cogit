package com.whitemind.cogit.schedule.entity;

import lombok.Data;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
public class ProblemCompositeKey implements Serializable {
    private int problemId;
    private String problemType;
}
