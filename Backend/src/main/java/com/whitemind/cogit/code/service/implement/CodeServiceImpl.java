package com.whitemind.cogit.code.service.implement;

import com.whitemind.cogit.code.dto.request.CodeRequest;
import com.whitemind.cogit.code.entity.Code;
import com.whitemind.cogit.code.entity.Language;
import com.whitemind.cogit.code.repository.CodeRepository;
import com.whitemind.cogit.code.service.CodeService;
import com.whitemind.cogit.common.error.CustomException;
import com.whitemind.cogit.common.error.ExceptionCode;
import com.whitemind.cogit.member.entity.Member;
import com.whitemind.cogit.member.repository.MemberRepository;
import com.whitemind.cogit.schedule.entity.AlgorithmQuest;
import com.whitemind.cogit.schedule.entity.AlgorithmQuestCompositeKey;
import com.whitemind.cogit.schedule.entity.AlgorithmQuestPlatform;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Service
@RequiredArgsConstructor
@Slf4j
public class CodeServiceImpl implements CodeService {
    private final EntityManager em;
    private final CodeRepository codeRepository;
    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public void saveCode(CodeRequest codeRequest, String uuid, int memberId) {
        log.info("saveCode | 사용자 코드 데이터베이스에 저장");

        // 해당 코드와 연결된 알고리즘 문제 가져오기
        AlgorithmQuestCompositeKey algorithmQuestCompositeKey = AlgorithmQuestCompositeKey.builder()
                .algorithmQuestId(codeRequest.getAlgorithmQuestId())
                .algorithmQuestPlatform(setPlatform(codeRequest.getAlgorithmQuestPlatform()))
                .build();

        AlgorithmQuest algorithmQuest = em.find(AlgorithmQuest.class, algorithmQuestCompositeKey);

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ExceptionCode.NOT_EXIST_MEMBER_EXCEPTION));

        Code code = Code.builder()
                .member(member)
                .algorithmQuest(algorithmQuest)
                .codeRunningTime(codeRequest.getCodeRunningTime())
                .codeContent(codeRequest.getCodeContent())
                .codeSolved(codeRequest.isCodeSolved())
                .codeAnalyze("https://s3.console.aws.amazon.com/s3/buckets/cogitusercode?region=ap-northeast-2&tab=objects")
                .language(codeRequest.getCodeLanguage())
                .codeUuid(uuid)
                .build();

        codeRepository.save(code);
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
