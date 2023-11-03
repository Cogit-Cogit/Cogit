package com.whitemind.cogit.schedule.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CreateScheduleRequest {
    private int studyId;
    private List<String> algorithmQuestList;
    private String scheduleName;
    private LocalDate scheduleStart;
    private LocalDate scheduleEnd;
}
