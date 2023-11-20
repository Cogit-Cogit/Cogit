package com.whitemind.cogit.schedule.repository;

import java.util.List;

import com.whitemind.cogit.schedule.dto.GetScheduleDto;
import com.whitemind.cogit.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {
    Schedule findByScheduleId(int scheduleId);
    @Query("select s " +
            "from Schedule s " +
            "where s.scheduleName = :scheduleName " +
            "and s.team.teamId = :teamid")
    Schedule findByScheduleNameAndScheduleId(@Param("scheduleName") String scheduleName, @Param("teamid") int scheduleId);
    List<Schedule> findTop5ByTeamTeamIdOrderByScheduleEndAtDesc(int teamId);

}
