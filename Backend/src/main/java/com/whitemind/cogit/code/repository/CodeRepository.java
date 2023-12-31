package com.whitemind.cogit.code.repository;

import com.whitemind.cogit.code.entity.Code;
import com.whitemind.cogit.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CodeRepository extends JpaRepository<Code, Integer> {
    @Query("SELECT c " +
            "from Code c " +
            "where c.member.memberId = :memberId " +
            "and c.algorithmQuest.algorithmQuestId = :algorithmQuestId " +
            "order by  c.codeId desc "
    )
    List<Code> findByAlgorithmQuestIdAndMemberIdByPage(@Param("memberId") int memberId, @Param("algorithmQuestId") int algorithmQuestId);

    @Query("SELECT c " +
            "from Code c " +
            "where c.member.memberId = :memberId " +
            "order by  c.codeId desc "
    )
    List<Code> findByMemberIdByPage(@Param("memberId") int memberId);

    @Query("SELECT c.codeId " +
            "from Code c " +
            "where c.member.memberId = :memberId " +
            "and c.algorithmQuest.algorithmQuestId = :algorithmQuestId " +
            "order by c.codeId desc")
    List<Integer> findFirstByMemberIdAndAlgorithmQuestId(@Param("memberId") int memberId, @Param("algorithmQuestId") int algorithmQuestId);
}
