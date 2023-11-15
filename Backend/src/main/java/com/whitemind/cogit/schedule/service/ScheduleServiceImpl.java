package com.whitemind.cogit.schedule.service;

import com.whitemind.cogit.common.error.CustomException;
import com.whitemind.cogit.common.error.ExceptionCode;
import com.whitemind.cogit.member.entity.Member;
import com.whitemind.cogit.member.entity.MemberAlgorithmQuest;
import com.whitemind.cogit.member.entity.MemberTeam;
import com.whitemind.cogit.member.entity.Team;
import com.whitemind.cogit.member.repository.MemberAlgorithmQuestRepository;
import com.whitemind.cogit.member.repository.MemberRepository;
import com.whitemind.cogit.member.repository.MemberTeamRepository;
import com.whitemind.cogit.member.repository.TeamRepository;
import com.whitemind.cogit.schedule.dto.AlgorithmQuestDto;
import com.whitemind.cogit.schedule.dto.GetMemberAlgorithmQuestDto;
import com.whitemind.cogit.schedule.dto.GetScheduleDto;
import com.whitemind.cogit.schedule.dto.request.AddQuestRequest;
import com.whitemind.cogit.schedule.dto.request.CreateScheduleRequest;
import com.whitemind.cogit.schedule.dto.response.GetAlgorithmQuestResponse;
import com.whitemind.cogit.schedule.dto.response.GetStudyDetailResponse;
import com.whitemind.cogit.schedule.entity.AlgorithmQuest;
import com.whitemind.cogit.schedule.entity.AlgorithmQuestPlatform;
import com.whitemind.cogit.schedule.entity.Schedule;
import com.whitemind.cogit.schedule.repository.AlgorithmQuestRepository;
import com.whitemind.cogit.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class ScheduleServiceImpl implements ScheduleService{
    private final TeamRepository teamRepository;
    private final MemberRepository memberRepository;
    private final ScheduleRepository scheduleRepository;
    private final AlgorithmQuestRepository algorithmQuestRepository;
    private final MemberAlgorithmQuestRepository memberAlgorithmQuestRepository;
    private final MemberTeamRepository memberTeamRepository;

    @Override
    public List<GetStudyDetailResponse> getAllStudyDetail(HttpServletRequest request) {
        Member member = memberRepository.findById((Integer) request.getAttribute("memberId"))
            .orElseThrow(() -> new CustomException(ExceptionCode.NOT_EXIST_MEMBER_EXCEPTION));

        List<MemberTeam> memberTeams = memberTeamRepository.findByMember(member);

        List<GetStudyDetailResponse> getStudyDetailResponseList = memberTeams.stream()
            .map(memberteam -> getStudyDetail(memberteam.getTeam().getTeamId(), request))
            .collect(Collectors.toList());

        return getStudyDetailResponseList;
    }

    @Override
    @Transactional
    public void createSchedule(CreateScheduleRequest scheduleRequest) {

        Team study = teamRepository.findById(scheduleRequest.getStudyId())
                .orElseThrow(() -> new CustomException(ExceptionCode.NOT_EXIST_TEAM_EXCEPTION));

        // 스케줄 등록
        Schedule schedule = Schedule.builder()
                .scheduleName(scheduleRequest.getScheduleName())
                .scheduleStartAt(scheduleRequest.getScheduleStart())
                .scheduleEndAt(scheduleRequest.getScheduleEnd())
                .team(study).build();
        scheduleRepository.save(schedule);

        addQuestToSchedule(scheduleRequest.getAlgorithmQuestList(), schedule, scheduleRequest.getStudyId());
    }

    @Override
    public GetStudyDetailResponse getStudyDetail(int teamId, HttpServletRequest request) {
        Team team = teamRepository.findById(teamId)
            .orElseThrow(()->new CustomException(ExceptionCode.NOT_EXIST_TEAM_EXCEPTION));

        List<Schedule> schedules = scheduleRepository.findTop5ByTeamTeamIdOrderByScheduleEndAtDesc(teamId);

        List<GetScheduleDto> getSchedules = new ArrayList<>();

        for (Schedule schedule: schedules) {
            GetScheduleDto getSchedule = GetScheduleDto.builder()
                .scheduleId(schedule.getScheduleId())
                .scheduleName(schedule.getScheduleName())
                .scheduleStartAt(schedule.getScheduleStartAt())
                .scheduleEndAt(schedule.getScheduleEndAt())
                .build();
            getSchedules.add(getSchedule);
        }

        GetStudyDetailResponse getStudyDetailResponse = GetStudyDetailResponse.builder()
            .teamId(team.getTeamId())
            .teamName(team.getTeamName())
            .scheduleList(getSchedules)
            .build();
        return getStudyDetailResponse;
    }

    @Override
    public List<GetAlgorithmQuestResponse> getScheduleDetail(int scheduleId, HttpServletRequest request) {

        List<GetAlgorithmQuestResponse>getAlgorithmQuestResponses = new ArrayList<>();
        Schedule schedule = scheduleRepository.findById(scheduleId)
            .orElseThrow(() -> new NoSuchElementException("해당 일정이 존재하지 않습니다."));

        List<AlgorithmQuest> algorithmQuests = algorithmQuestRepository.findBySchedule(schedule);

        for (AlgorithmQuest algorithmQuest: algorithmQuests) {
            List<MemberAlgorithmQuest> memberAlgorithmQuests = memberAlgorithmQuestRepository.findByAlgorithmQuest(algorithmQuest);
            List<GetMemberAlgorithmQuestDto> getMemberAlgorithmQuests = new ArrayList<>();
            for (MemberAlgorithmQuest memberAlgorithmQuest: memberAlgorithmQuests) {
                GetMemberAlgorithmQuestDto getMemberAlgorithmQuest = GetMemberAlgorithmQuestDto.builder()
                    .memberAlgorithmQuestId(memberAlgorithmQuest.getMemberAlgorithmQuestId())
                    .memberId(memberAlgorithmQuest.getMember().getMemberId())
                    .memberAlgorithmQuestSolved(memberAlgorithmQuest.isMemberAlgorithmQuestSolved())
                    .build();
                getMemberAlgorithmQuests.add(getMemberAlgorithmQuest);
            }

            GetAlgorithmQuestResponse getAlgorithmQuest = GetAlgorithmQuestResponse.builder()
                .algorithmQuestId(algorithmQuest.getAlgorithmQuestId())
                .algorithmQuestNumber(algorithmQuest.getAlgorithmQuestNumber())
                .algorithmQuestPlatform(algorithmQuest.getAlgorithmQuestPlatform().getValue())
                .algorithmQuestUrl(algorithmQuest.getAlgorithmQuestUrl())
                .memberAlgorithmQuestList(getMemberAlgorithmQuests)
                .build();

            getAlgorithmQuestResponses.add(getAlgorithmQuest);

        }

        return getAlgorithmQuestResponses;
    }

    @Override
    public void addQuest(AddQuestRequest addQuestRequest) {
        Schedule schedule = scheduleRepository.findByScheduleId(addQuestRequest.getScheduleId());
        // 문제 등록
        addQuestToSchedule(addQuestRequest.getAlgorithmQuestList(), schedule, addQuestRequest.getScheduleId());
    }

    public void addQuestToSchedule(List<AlgorithmQuestDto> algorithmQuestList, Schedule schedule, int studyId) {
        // 해당 스케줄에 각 문제 등록
        for (AlgorithmQuestDto algorithmQuestDto : algorithmQuestList){
            String platform = algorithmQuestDto.getPlatform();
            int questNumber = algorithmQuestDto.getQuestNumber();
            String url = "";

            // 문제 URL 이상 여부 판단
            if (!platform.equals("PROG") && !platform.equals("BOJ")) {
                throw new CustomException(ExceptionCode.NOT_EXIST_ALGORITHM_PLATFORM_EXCEPTION);
            }

            if(platform.equals("PROG")) {
                url = "https://school.programmers.co.kr/learn/courses/30/lessons/";
            }

            if(platform.equals("BOJ")) {
                url = "https://www.acmicpc.net/problem/";
            }

            url += questNumber;

            AlgorithmQuest algorithmQuest = AlgorithmQuest.builder()
                    .algorithmQuestNumber(questNumber)
                    .algorithmQuestUrl(url)
                    .algorithmQuestPlatform(platform.equals("PROG") ? AlgorithmQuestPlatform.PROGRAMMERS : AlgorithmQuestPlatform.BAEKJOON)
                    .schedule(schedule)
                    .build();
            algorithmQuestRepository.save(algorithmQuest);

            List<MemberTeam> memberTeams = memberTeamRepository.findByTeamTeamId(studyId);
            for (MemberTeam memberTeam: memberTeams) {
                MemberAlgorithmQuest memberAlgorithmQuest = MemberAlgorithmQuest.builder()
                        .algorithmQuest(algorithmQuest)
                        .member(memberTeam.getMember())
                        .build();
                memberAlgorithmQuestRepository.save(memberAlgorithmQuest);
            }
        }
    }
}
