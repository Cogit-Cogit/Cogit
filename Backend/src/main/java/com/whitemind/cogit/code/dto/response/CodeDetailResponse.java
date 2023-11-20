package com.whitemind.cogit.code.dto.response;

import lombok.*;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@Getter
public class CodeDetailResponse {
    private int codeId;
    private int algorithmQuestId;
    private String algorithmQuestPlatform;
    private int memberId;
    private String codeContent;
    private LocalDate createAt;
    private String codeAnalyze;
    private String codeLanguage;
    private double codeRunningTime;
    private boolean codeSolved;
}
