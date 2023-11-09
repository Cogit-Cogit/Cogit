package com.whitemind.cogit.code.service.implement;

import com.whitemind.cogit.code.dto.request.CodeRequest;
import com.whitemind.cogit.code.entity.Code;
import com.whitemind.cogit.code.entity.Language;
import com.whitemind.cogit.code.repository.CodeRepository;
import com.whitemind.cogit.code.service.CodeService;
import com.whitemind.cogit.common.error.NotExistMemberException;
import com.whitemind.cogit.member.entity.Member;
import com.whitemind.cogit.member.repository.MemberRepository;
import com.whitemind.cogit.schedule.entity.AlgorithmQuest;
import com.whitemind.cogit.schedule.entity.AlgorithmQuestCompositeKey;
import com.whitemind.cogit.schedule.entity.AlgorithmQuestPlatform;
import com.whitemind.cogit.schedule.repository.AlgorithmQuestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Service
@RequiredArgsConstructor
public class CodeServiceImpl implements CodeService {
    private final EntityManager em;
    private final CodeRepository codeRepository;
    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public void saveCode(CodeRequest codeRequest, int memberId) {
        // 해당 코드와 연결된 알고리즘 문제 가져오기
        AlgorithmQuestCompositeKey algorithmQuestCompositeKey = AlgorithmQuestCompositeKey.builder()
                .algorithmQuestId(codeRequest.getAlgorithmQuestId())
                .algorithmQuestPlatform(AlgorithmQuestPlatform.BAEKJOON)       // TODO: 임시로 백준으로 고정, 필터링 방법 논의 필요,
                .build();

        AlgorithmQuest algorithmQuest = em.find(AlgorithmQuest.class, algorithmQuestCompositeKey);

        Member member = memberRepository.findById(memberId)
                .orElseThrow(NotExistMemberException::new);

        Code code = Code.builder()
                .member(member)
                .algorithmQuest(algorithmQuest)
                .codeRunningTime(codeRequest.getCodeRunningTime())
                .codeContent(codeRequest.getCodeContent())
                .codeSolved(codeRequest.isCodeSolved())
                .codeAnalyze("https://s3.console.aws.amazon.com/s3/buckets/cogitusercode?region=ap-northeast-2&tab=objects")
                .language(Language.JAVA)       // TODO: 임시로 Java로 고정, 필터링 방법 논의 필요
                .build();

        codeRepository.save(code);
    }
}
