package com.whitemind.cogit.schedule.service;

import java.util.List;

import com.whitemind.cogit.schedule.dto.request.AddQuestRequest;
import com.whitemind.cogit.schedule.dto.request.CreateScheduleRequest;
import com.whitemind.cogit.schedule.dto.response.GetAlgorithmQuestResponse;
import com.whitemind.cogit.schedule.dto.response.GetStudyDetailResponse;

import javax.servlet.http.HttpServletRequest;

public interface ScheduleService {

    List<GetStudyDetailResponse> getAllStudyDetail(HttpServletRequest request);

    void createSchedule(CreateScheduleRequest schedule);

    GetStudyDetailResponse getStudyDetail(int teamId, HttpServletRequest request);

    List<GetAlgorithmQuestResponse> getScheduleDetail(int scheduleId, HttpServletRequest request);

    void addQuest(AddQuestRequest addQuestRequest);
}
