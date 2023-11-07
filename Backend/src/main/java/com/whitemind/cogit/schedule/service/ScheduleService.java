package com.whitemind.cogit.schedule.service;

import com.whitemind.cogit.schedule.dto.request.CreateScheduleRequest;

import javax.servlet.http.HttpServletRequest;

public interface ScheduleService {

    void createSchedule(CreateScheduleRequest schedule, HttpServletRequest request);
}
