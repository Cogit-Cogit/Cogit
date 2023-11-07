package com.whitemind.cogit.schedule.controller;

import java.util.List;

import com.whitemind.cogit.common.response.ListResponseResult;
import com.whitemind.cogit.common.response.ResponseResult;
import com.whitemind.cogit.common.response.SingleResponseResult;
import com.whitemind.cogit.member.dto.request.CreateStudyRequest;
import com.whitemind.cogit.schedule.dto.request.CreateScheduleRequest;
import com.whitemind.cogit.schedule.dto.response.GetAlgorithmQuestResponse;
import com.whitemind.cogit.schedule.dto.response.GetStudyDetailResponse;
import com.whitemind.cogit.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/schedule")
public class ScheduleController {
    private final ScheduleService scheduleService;
    @PostMapping("/add")
    public ResponseResult createStudySchetule(@RequestBody CreateScheduleRequest schedule, HttpServletRequest request) throws Exception {
        log.info("createStudySchetule | Study 스케줄 생성 요청");
        scheduleService.createSchedule(schedule, request);
        return ResponseResult.successResponse;
    }

    @GetMapping("/team")
    public SingleResponseResult getStudyDetail(int teamId, HttpServletRequest request) throws Exception {
        return new SingleResponseResult<GetStudyDetailResponse>(scheduleService.getStudyDetail(teamId, request));
    }

    @GetMapping()
    public ListResponseResult getScheduleDetail(int scheduleId, HttpServletRequest request) throws Exception {
        return new ListResponseResult<GetAlgorithmQuestResponse>(scheduleService.getScheduleDetail(scheduleId, request));
    }
}
