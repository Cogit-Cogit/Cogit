package com.whitemind.cogit.schedule.repository;

import java.util.List;

import com.nimbusds.jose.Algorithm;
import com.whitemind.cogit.schedule.entity.AlgorithmQuest;
import com.whitemind.cogit.schedule.entity.Schedule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlgorithmQuestRepository extends JpaRepository<AlgorithmQuest, Integer> {
    AlgorithmQuest findByAlgorithmQuestNumber(int algorithmQuestNumber);

    List<AlgorithmQuest> findBySchedule(Schedule schedule);
}
