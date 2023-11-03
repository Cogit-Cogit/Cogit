package com.whitemind.cogit.code.service.implement;

import com.querydsl.core.QueryFactory;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.whitemind.cogit.code.dto.request.CodeRequest;
import com.whitemind.cogit.code.entity.Code;
import com.whitemind.cogit.code.repository.CodeRepository;
import com.whitemind.cogit.code.service.CodeService;
import com.whitemind.cogit.common.error.CustomException;
import com.whitemind.cogit.common.error.ExceptionCode;
import com.whitemind.cogit.member.entity.Member;
import com.whitemind.cogit.member.entity.MemberAlgorithmQuest;
import com.whitemind.cogit.member.entity.QMember;
import com.whitemind.cogit.member.repository.MemberRepository;
import com.whitemind.cogit.schedule.entity.AlgorithmQuest;
import com.whitemind.cogit.schedule.entity.AlgorithmQuestPlatform;
import com.whitemind.cogit.schedule.repository.AlgorithmQuestRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CodeServiceImpl implements CodeService {
    private final EntityManager em;
    private final CodeRepository codeRepository;
    private final MemberRepository memberRepository;
    private final AlgorithmQuestRepository algorithmQuestRepository;
    private final JPAQueryFactory queryFactory;


    @Override
    @Transactional
    public void saveCode(CodeRequest codeRequest, String uuid, int memberId) {
        log.info("saveCode | 사용자 코드 데이터베이스에 저장");

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ExceptionCode.NOT_EXIST_MEMBER_EXCEPTION));

        List<MemberAlgorithmQuest> memberAlgorithmQuestList = member.getMemberAlgorithmQuestList();
//        if(memberAlgorithmQuestList.size() == 0) {
//            log.info("saveCode | 일정에 등록되지 않은 문제 => 개인 그룹 업로드");
//
//
//            Code code = Code.builder()
//                    .member(member)
//                    .algorithmQuest(algorithmQuest)
//                    .codeRunningTime(codeRequest.getCodeRunningTime())
//                    .codeContent(codeRequest.getCodeContent())
//                    .codeSolved(codeRequest.isCodeSolved())
//                    .codeAnalyze("https://s3.console.aws.amazon.com/s3/buckets/cogitusercode?region=ap-northeast-2&tab=objects")
//                    .language(codeRequest.getCodeLanguage())
//                    .codeUuid(uuid)
//                    .build();
//        }
//
//        Code code = Code.builder()
//                .member(member)
//                .algorithmQuest(algorithmQuest)
//                .codeRunningTime(codeRequest.getCodeRunningTime())
//                .codeContent(codeRequest.getCodeContent())
//                .codeSolved(codeRequest.isCodeSolved())
//                .codeAnalyze("https://s3.console.aws.amazon.com/s3/buckets/cogitusercode?region=ap-northeast-2&tab=objects")
//                .language(codeRequest.getCodeLanguage())
//                .codeUuid(uuid)
//                .build();
//
//
//
//        codeRepository.save(code);
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
