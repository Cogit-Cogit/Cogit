package com.whitemind.cogit.schedule.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class AddQuestRequest {
    private int scheduleId;
    private List<String> algorithmQuestList;
}
