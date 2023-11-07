package com.whitemind.cogit.schedule.repository;

import java.util.List;

import com.whitemind.cogit.schedule.dto.GetScheduleDto;
import com.whitemind.cogit.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {
    Schedule findByScheduleId(int scheduleId);
    List<Schedule> findTop5ByTeamTeamIdOrderByScheduleEndAtDesc(int teamId);

}
