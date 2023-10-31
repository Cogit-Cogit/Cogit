package com.whitemind.cogit.code.entity;

import lombok.Data;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
public class CodeCompositeKey implements Serializable {
    private int codeId;
    private String codeLineNumber;
}
