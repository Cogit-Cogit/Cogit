package com.whitemind.cogit.schedule.service;

import com.whitemind.cogit.common.error.CustomException;
import com.whitemind.cogit.common.error.ExceptionCode;
import com.whitemind.cogit.member.entity.Team;
import com.whitemind.cogit.member.repository.TeamRepository;
import com.whitemind.cogit.schedule.dto.request.CreateScheduleRequest;
import com.whitemind.cogit.schedule.entity.AlgorithmQuest;
import com.whitemind.cogit.schedule.entity.AlgorithmQuestPlatform;
import com.whitemind.cogit.schedule.entity.Schedule;
import com.whitemind.cogit.schedule.repository.AlgorithmQuestRepository;
import com.whitemind.cogit.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class ScheduleServiceImpl implements ScheduleService{
    private final TeamRepository teamRepository;
    private final ScheduleRepository scheduleRepository;
    private final AlgorithmQuestRepository algorithmQuestRepository;

    @Override
    public void createSchedule(CreateScheduleRequest scheduleRequest) {
        Team study = teamRepository.findById(scheduleRequest.getStudyId())
                .orElseThrow(() -> new CustomException(ExceptionCode.NOT_EXIST_TEAM_EXCEPTION));

        Schedule schedule = Schedule.builder()
                .scheduleName(scheduleRequest.getScheduleName())
                .scheduleStartAt(scheduleRequest.getScheduleStart())
                .scheduleEndAt(scheduleRequest.getScheduleEnd())
                .team(study).build();

        scheduleRepository.save(schedule);


        for (String questUrl : scheduleRequest.getAlgorithmQuestList()){
            AlgorithmQuest algorithmQuest = AlgorithmQuest.builder()
                    .algorithmQuestNumber(123)
                    .algorithmQuestUrl(questUrl)
                    .algorithmQuestPlatform(AlgorithmQuestPlatform.BAEKJOON)
                    .schedule(schedule)
                    .build();
            algorithmQuestRepository.save(algorithmQuest);
        }
    }
}
