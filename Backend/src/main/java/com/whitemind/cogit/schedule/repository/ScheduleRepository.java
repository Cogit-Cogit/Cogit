package com.whitemind.cogit.schedule.repository;

import com.whitemind.cogit.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {

}
