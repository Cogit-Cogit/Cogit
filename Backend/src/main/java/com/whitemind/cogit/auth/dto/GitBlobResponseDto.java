package com.whitemind.cogit.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GitBlobResponseDto {
    private String path;
    private String sha;
    private String mode;
    private String type;
}
