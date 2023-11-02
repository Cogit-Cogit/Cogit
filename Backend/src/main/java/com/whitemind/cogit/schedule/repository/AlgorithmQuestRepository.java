package com.whitemind.cogit.schedule.repository;

import com.whitemind.cogit.schedule.entity.AlgorithmQuest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlgorithmQuestRepository extends JpaRepository<AlgorithmQuest, Integer> {
}
