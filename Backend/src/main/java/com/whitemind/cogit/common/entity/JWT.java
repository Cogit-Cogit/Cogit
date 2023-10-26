package com.whitemind.cogit.common.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JWT {
    private String grantType;
    private String accessToken;
    private String refreshToken;
    private String key;
}