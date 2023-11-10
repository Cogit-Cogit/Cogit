package com.whitemind.cogit.code.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class GetCodeHistoryResponse {
    private int codeId;
    private String codeLanguage;
    private double codeRunningTime;
    private boolean codeSolved;
}
