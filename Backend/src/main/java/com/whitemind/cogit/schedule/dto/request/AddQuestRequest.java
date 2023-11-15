package com.whitemind.cogit.schedule.dto.request;

import com.whitemind.cogit.schedule.dto.AlgorithmQuestDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class AddQuestRequest {
    private int scheduleId;
    private List<AlgorithmQuestDto> algorithmQuestList;
}
