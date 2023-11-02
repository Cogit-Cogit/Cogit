package com.whitemind.cogit.schedule.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.io.Serializable;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class AlgorithmQuestCompositeKey implements Serializable {
    private int algorithmQuestId;

    @Enumerated(EnumType.STRING)
    private AlgorithmQuestPlatform algorithmQuestPlatform;
}
