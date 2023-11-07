package com.whitemind.cogit.schedule.repository;

import com.nimbusds.jose.Algorithm;
import com.whitemind.cogit.schedule.entity.AlgorithmQuest;
import com.whitemind.cogit.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlgorithmQuestRepository extends JpaRepository<AlgorithmQuest, Integer> {
    AlgorithmQuest findByAlgorithmQuestNumber(int algorithmQuestNumber);

    List<AlgorithmQuest> findAlgorithmQuestsBySchedule(Schedule schedule);
}
