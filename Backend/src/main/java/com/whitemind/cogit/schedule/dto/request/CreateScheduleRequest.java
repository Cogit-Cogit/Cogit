package com.whitemind.cogit.schedule.dto.request;

import com.whitemind.cogit.schedule.dto.AlgorithmQuestDto;
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
    private List<AlgorithmQuestDto> algorithmQuestList;
    private String scheduleName;
    private LocalDate scheduleStart;
    private LocalDate scheduleEnd;
}
