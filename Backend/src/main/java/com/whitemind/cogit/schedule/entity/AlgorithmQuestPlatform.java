package com.whitemind.cogit.schedule.entity;

import lombok.Getter;

@Getter
public enum AlgorithmQuestPlatform {
    BAEKJOON("BAEKJOON"),
    PROGRAMMERS("PROGRAMMERS");

    private final String value;

    AlgorithmQuestPlatform(String value) {
        this.value = value;
    }
}
