package com.whitemind.cogit.code.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class WriteCommentRequest {

    private int codeId;
    private int commentLineNumber;
    private String commentContent;
}
