package com.whitemind.cogit.member.repository;

import java.util.List;

import com.whitemind.cogit.member.entity.MemberAlgorithmQuest;
import com.whitemind.cogit.schedule.entity.AlgorithmQuest;

import com.whitemind.cogit.member.entity.MemberTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberAlgorithmQuestRepository extends JpaRepository<MemberAlgorithmQuest, Integer> {

    @Query("SELECT q " +
    "FROM MemberAlgorithmQuest q " +
    "WHERE q.algorithmQuest.algorithmQuestId = :algorithmQuestId " +
    "AND q.member.memberId = :memberId")
    MemberAlgorithmQuest findByAlgorithmQuestIdAndMemberId(@Param("algorithmQuestId") int algorithmQuestId,
                                                           @Param("memberId") int memberId);
	List<MemberAlgorithmQuest> findByAlgorithmQuest(AlgorithmQuest algorithmQuest);
}
