package com.whitemind.cogit.schedule.repository;

import java.util.List;

import com.nimbusds.jose.Algorithm;
import com.whitemind.cogit.schedule.entity.AlgorithmQuest;
import com.whitemind.cogit.schedule.entity.AlgorithmQuestPlatform;
import com.whitemind.cogit.schedule.entity.Schedule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AlgorithmQuestRepository extends JpaRepository<AlgorithmQuest, Integer> {
    AlgorithmQuest findByAlgorithmQuestNumber(int algorithmQuestNumber);

    List<AlgorithmQuest> findBySchedule(Schedule schedule);

    @Query("select q " +
    "from  AlgorithmQuest q " +
    "where :algorithmQuestNumber IS NULL OR q.algorithmQuestNumber = :algorithmQuestNumber " +
    "and :algorithmQuestPlatform IS NULL OR q.algorithmQuestPlatform = :algorithmQuestPlatform")
    List<AlgorithmQuest> findByQuestIdAndPlatform(
            @Param("algorithmQuestNumber") int algorithmQuestNumber,@Param("algorithmQuestPlatform") AlgorithmQuestPlatform algorithmQuestPlatform);
}
