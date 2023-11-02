package com.whitemind.cogit.code.entity;

import lombok.Getter;

@Getter
public enum Language {
    JAVA("Java"),
    JAVASCRIPT("JavaScript"),
    PYTHON("Python"),
    C("C"),
    CPP("C++");

    private final String value;

    Language(String value) {
        this.value = value;
    }
}
