package com.whitemind.cogit.member.entity;

import lombok.Getter;

@Getter
public enum MemberTeamRole {
    LEADER("LEADER"),
    MEMBER("MEMBER");

    private final String value;

    MemberTeamRole(String value) {
        this.value = value;
    }
}
