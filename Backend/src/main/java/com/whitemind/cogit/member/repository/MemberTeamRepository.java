package com.whitemind.cogit.member.repository;import java.util.List;import java.util.Optional;import org.springframework.data.jpa.repository.JpaRepository;import com.whitemind.cogit.member.entity.MemberTeam;import com.whitemind.cogit.member.entity.Team;public interface MemberTeamRepository extends JpaRepository<MemberTeam, Integer> {	List<MemberTeam> findByTeamTeamId(int teamId);	void deleteByMemberMemberIdAndTeamTeamId(int memberId, int teamId);	Optional<MemberTeam> findByMemberMemberIdAndTeamTeamId(int memberId, int teamId);	List<MemberTeam> findByTeamTeamIdOrderByMemberTeamQuestCountDescMemberTeamRankTimeAsc(int teamId);	List<MemberTeam> findByTeam(Team team);}