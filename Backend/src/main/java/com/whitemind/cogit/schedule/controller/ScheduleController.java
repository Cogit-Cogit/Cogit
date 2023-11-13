package com.whitemind.cogit.schedule.controller;

import com.whitemind.cogit.common.response.ListResponseResult;
import com.whitemind.cogit.common.response.ResponseResult;
import com.whitemind.cogit.common.response.SingleResponseResult;
import com.whitemind.cogit.schedule.dto.request.AddQuestRequest;
import com.whitemind.cogit.schedule.dto.request.CreateScheduleRequest;
import com.whitemind.cogit.schedule.dto.response.GetAlgorithmQuestResponse;
import com.whitemind.cogit.schedule.dto.response.GetStudyDetailResponse;
import com.whitemind.cogit.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/schedule")
public class ScheduleController {
    private final ScheduleService scheduleService;
    @PostMapping("/add")
    public ResponseResult createStudySchedule(@RequestBody CreateScheduleRequest schedule) throws Exception {
        log.info("createStudySchedule | Study 스케줄 생성 요청");
        scheduleService.createSchedule(schedule);
        return ResponseResult.successResponse;
    }

    @GetMapping("/team")
    public SingleResponseResult<GetStudyDetailResponse> getStudyDetail(@RequestParam int teamId, HttpServletRequest request) throws Exception {
        log.info("getStudyDetail | 스터디 상세 정보 조회");
        return new SingleResponseResult<>(scheduleService.getStudyDetail(teamId, request));
    }

    @GetMapping()
    public ListResponseResult<GetAlgorithmQuestResponse> getScheduleDetail(@RequestParam int scheduleId, HttpServletRequest request) throws Exception {
        log.info("getScheduleDetail | 스터디 일정 상세 정보 조회");
        return new ListResponseResult<>(scheduleService.getScheduleDetail(scheduleId, request));
    }

    @PostMapping("/quest/add")
    public ResponseResult addQuestToSchedule(@RequestBody AddQuestRequest addQuestRequest) {
        log.info("addQuestToSchedule | 일정에 알고리즘 문제 추가");
        scheduleService.addQuest(addQuestRequest);
        return SingleResponseResult.successResponse;
    }
}
