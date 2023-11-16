package com.whitemind.cogit.code.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
public class GetCommentResponse {
    int commentId;
    int commentLineNumber;
    int memberId;
    String memberNickname;
    String memberProfileImage;
    String commentContent;
    LocalDateTime createAt;
}
