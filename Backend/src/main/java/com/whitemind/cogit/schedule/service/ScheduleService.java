package com.whitemind.cogit.schedule.service;

import com.whitemind.cogit.schedule.dto.request.CreateScheduleRequest;

public interface ScheduleService {

    void createSchedule(CreateScheduleRequest schedule);
}
