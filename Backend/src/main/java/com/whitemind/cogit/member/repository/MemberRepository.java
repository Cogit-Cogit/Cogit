package com.whitemind.cogit.member.repository;

import com.whitemind.cogit.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    Member findMembersByMemberId(int memberId);
    Member findMembersByMemberRefreshToken(String refreshToken);
}
