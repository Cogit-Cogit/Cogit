package com.whitemind.cogit.code.service.implement;

import com.whitemind.cogit.code.dto.request.CodeRequest;
import com.whitemind.cogit.code.dto.response.CodeDetailResponse;
import com.whitemind.cogit.code.dto.response.GetCodeHistoryResponse;
import com.whitemind.cogit.code.entity.Code;
import com.whitemind.cogit.code.repository.CodeRepository;
import com.whitemind.cogit.code.service.CodeService;
import com.whitemind.cogit.common.error.CustomException;
import com.whitemind.cogit.common.error.ExceptionCode;
import com.whitemind.cogit.member.entity.Member;
import com.whitemind.cogit.member.entity.MemberAlgorithmQuest;
import com.whitemind.cogit.member.entity.MemberTeam;
import com.whitemind.cogit.member.repository.MemberAlgorithmQuestRepository;
import com.whitemind.cogit.member.repository.MemberRepository;
import com.whitemind.cogit.schedule.entity.AlgorithmQuest;
import com.whitemind.cogit.schedule.entity.AlgorithmQuestPlatform;
import com.whitemind.cogit.schedule.entity.Schedule;
import com.whitemind.cogit.schedule.repository.AlgorithmQuestRepository;
import com.whitemind.cogit.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CodeServiceImpl implements CodeService {
    private final CodeRepository codeRepository;
    private final MemberRepository memberRepository;
    private final ScheduleRepository scheduleRepository;
    private final AlgorithmQuestRepository algorithmQuestRepository;
    private final MemberAlgorithmQuestRepository memberAlgorithmQuestRepository;


    @Override
    @Transactional
    public void saveCode(CodeRequest codeRequest, String uuid, int memberId) {
        log.info("saveCode | 사용자 코드 데이터베이스에 저장");

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ExceptionCode.NOT_EXIST_MEMBER_EXCEPTION));

        List<MemberAlgorithmQuest> memberAlgorithmQuestList = member.getMemberAlgorithmQuestList();
        List<AlgorithmQuest> currentSchedule = new ArrayList<>();

        AlgorithmQuest algorithmQuest = null;
        Code code = null;

        // 현재 날짜에 진행중인 스터디 일정 중에 해당 문제가 포함되어 있는지 체크
        for(MemberAlgorithmQuest memberAlgorithmQuest : memberAlgorithmQuestList) {
            if(memberAlgorithmQuest.getAlgorithmQuest().getAlgorithmQuestNumber() == codeRequest.getAlgorithmQuestNumber()) {
                if(!memberAlgorithmQuest.getAlgorithmQuest().getSchedule().getScheduleEndAt().isBefore(LocalDate.now())) {
                    if(codeRequest.isCodeSolved()) {
                        // 해당 문제가 아직 해결되지 않았을 때
                        if(!memberAlgorithmQuest.isMemberAlgorithmQuestSolved()) {

                            List<MemberTeam> memberTeamList = memberAlgorithmQuest.getAlgorithmQuest().getSchedule().getTeam().getMemberTeamList();


                            for (MemberTeam memberTeam : memberTeamList) {
                                if (memberTeam.getMember().getMemberId() == memberId) {
                                    log.info("saveCode | 문제 풀이 성공, 포인트 적립");
                                    memberTeam.addSovledQuest(memberAlgorithmQuest.getAlgorithmQuest().getSchedule().getScheduleStartAt());
                                }
                            }
                            memberAlgorithmQuest.checkSolved();
                        }
                    }

                    currentSchedule.add(memberAlgorithmQuest.getAlgorithmQuest());
                }
            }
        }

        // 일정에 포함되지 않은 문제라면 개인 저장소에 저장
        if(currentSchedule.size() == 0) {
            log.info("saveCode | 일정에 등록되지 않은 문제 => 개인 저장소 업로드");

            Schedule schedule = scheduleRepository.findByScheduleId(1);

            // 이미 문제 DB에 등록되어있는지 확인
            algorithmQuest = algorithmQuestRepository.findByAlgorithmQuestNumber(codeRequest.getAlgorithmQuestNumber());

            // DB에 없는 문제라면 저장
            if(algorithmQuest == null) {
                algorithmQuest = AlgorithmQuest.builder()
                        .schedule(schedule)
                        .algorithmQuestPlatform(setPlatform(codeRequest.getAlgorithmQuestPlatform()))
                        .algorithmQuestNumber(codeRequest.getAlgorithmQuestNumber())
                        .algorithmQuestUrl(codeRequest.getAlgorithmQuestUrl())
                        .build();
            }

            MemberAlgorithmQuest memberAlgorithmQuest = MemberAlgorithmQuest.builder()
                    .algorithmQuest(algorithmQuest)
                    .member(member)
                    .memberAlgorithmQuestSolved(codeRequest.isCodeSolved())
                    .build();

            algorithmQuestRepository.save(algorithmQuest);
            memberAlgorithmQuestRepository.save(memberAlgorithmQuest);
            currentSchedule.add(algorithmQuest);
        }



        for(AlgorithmQuest aq : currentSchedule) {
            code = Code.builder()
                    .member(member)
                    .algorithmQuest(aq)
                    .codeRunningTime(codeRequest.getCodeRunningTime())
                    .codeContent(codeRequest.getCodeContent())
                    .codeSolved(codeRequest.isCodeSolved())
                    .codeAnalyze("https://s3.console.aws.amazon.com/s3/buckets/cogitusercode?region=ap-northeast-2&tab=objects")
                    .language(codeRequest.getCodeLanguage())
                    .codeFileExtension(codeRequest.getCodeFileExtension())
                    .codeUuid(uuid)
                    .build();

            codeRepository.save(code);
        }
    }

    @Override
    public CodeDetailResponse getCodeDetail(int codeId) {
        Code code = codeRepository.findById(codeId)
                .orElseThrow(() -> new CustomException(ExceptionCode.NOT_EXIST_CODE_EXCEPTION));

        return CodeDetailResponse.builder()
                .codeId(codeId)
                .algorithmQuestId(code.getAlgorithmQuest().getAlgorithmQuestId())
                .codeContent(code.getCodeContent())
                .memberId(code.getMember().getMemberId())
                .algorithmQuestPlatform(code.getAlgorithmQuest().getAlgorithmQuestPlatform().toString())
                .createAt(LocalDate.from(code.getCreatedAt()))
                .codeAnalyze(code.getCodeAnalyze())
                .codeLanguage(code.getLanguage())
                .codeRunningTime(code.getCodeRunningTime())
                .codeSolved(false) // TODO
                .build();
    }

    @Override
    public List<GetCodeHistoryResponse> getCodeHisttory(int memberId, int scheduleId) {
        Schedule schedule = scheduleRepository.findByScheduleId(scheduleId);

        List<AlgorithmQuest> algorithmQuestList = algorithmQuestRepository.findAlgorithmQuestsBySchedule(schedule);

        List<GetCodeHistoryResponse> getCodeHistoryResponseList = new ArrayList<>();

        // AlgorithmQuest 조회
        for (AlgorithmQuest quest: algorithmQuestList) {
            // memberAlgorithmQuest 조회
            for (MemberAlgorithmQuest memberAlgorithmQuest: quest.getMemberAlgorithmQuestList()) {
                // member Code 조회
                for (Code code : memberAlgorithmQuest.getMember().getCodeList()) {
                    getCodeHistoryResponseList
                        .add(GetCodeHistoryResponse
                        .builder()
                        .codeId(code.getCodeId())
                        .codeLanguage(code.getLanguage())
                        .codeRunningTime(code.getCodeRunningTime())
                        .codeSolved(code.isCodeSolved())
                        .build());
                }
            }
        }

        return getCodeHistoryResponseList;
    }

    public void saveCodeToDatabase() {

    }

    // ENUM 정합성 체크
    public AlgorithmQuestPlatform setPlatform(String algorithmQuestPlatform) {
        switch (algorithmQuestPlatform) {
            case "BAEKJOON":
                return AlgorithmQuestPlatform.BAEKJOON;
            case "PROGRAMMERS":
                return AlgorithmQuestPlatform.PROGRAMMERS;
            default:
                throw new CustomException(ExceptionCode.NOT_EXIST_ALGORITHM_PLATFORM_EXCEPTION);
        }
    }
}
