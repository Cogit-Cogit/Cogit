package com.whitemind.cogit.member.repository;

import com.whitemind.cogit.member.dto.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findMembersByMemberId(Long memberId);
}
