package com.whitemind.cogit.member.service;import java.util.List;import java.util.NoSuchElementException;import java.util.stream.Collectors;import javax.transaction.Transactional;import org.springframework.stereotype.Service;import com.whitemind.cogit.common.error.CustomException;import com.whitemind.cogit.common.error.ExceptionCode;import com.whitemind.cogit.member.dto.request.AddMemberRequest;import com.whitemind.cogit.member.dto.request.DeleteMemberRequest;import com.whitemind.cogit.member.dto.response.GetMemberResponse;import com.whitemind.cogit.member.entity.Member;import com.whitemind.cogit.member.entity.MemberTeam;import com.whitemind.cogit.member.entity.MemberTeamRole;import com.whitemind.cogit.member.entity.Team;import com.whitemind.cogit.member.repository.MemberRepository;import com.whitemind.cogit.member.repository.MemberTeamRepository;import com.whitemind.cogit.member.repository.TeamRepository;import lombok.RequiredArgsConstructor;import lombok.extern.slf4j.Slf4j;@Slf4j@RequiredArgsConstructor@Servicepublic class StudyServiceImpl implements StudyService {	private final TeamRepository teamRepository;	private final MemberRepository memberRepository;	private final MemberTeamRepository memberTeamRepository;	@Override	public void createStudy(String teamName, int memberId) {		//팀 생성하기		Team team = Team.builder()			.teamName(teamName)			.build();		teamRepository.save(team);		Member member = memberRepository.findById(memberId)			.orElseThrow(() -> new CustomException(ExceptionCode.NOT_EXIST_MEMBER_EXCEPTION));		//팀에 멤버 넣기		MemberTeam memberTeam = MemberTeam.builder()			.team(team)			.member(member)			.memberTeamRole(MemberTeamRole.LEADER)			.build();		memberTeamRepository.save(memberTeam);	}	@Override	public void addMember(AddMemberRequest addMemberRequest, int memberId) {		//memberId가 팀장인지 확인		MemberTeamRole role = memberTeamRepository.findMemberTeamRoleByMemberMemberId(memberId);		if(role.equals(MemberTeamRole.MEMBER)){			throw new CustomException(ExceptionCode.NO_LEADER_TEAM_EXCEPTION);		}		//team 찾기		Team team = teamRepository.findById(addMemberRequest.getTeamId())			.orElseThrow(() ->new NoSuchElementException("스터디 정보가 없습니다."));		//add member		for (int addMemberId: addMemberRequest.getMemberIdList()) {			Member addMember = memberRepository.findById(addMemberId)				.orElseThrow(() -> new CustomException(ExceptionCode.NOT_EXIST_MEMBER_EXCEPTION));			MemberTeam memberTeam = MemberTeam.builder()				.team(team)				.member(addMember)				.memberTeamRole(MemberTeamRole.MEMBER)				.build();			memberTeamRepository.save(memberTeam);		}	}	@Override	public List<GetMemberResponse> getMemberList(int teamId, int memberId) {		List<MemberTeam> memberTeams = memberTeamRepository.findByTeamTeamId(teamId);		List<GetMemberResponse> getMemberResponseList = memberTeams.stream()			.map(memberTeam -> memberTeam.getMember().toGetMemberListResponse())			.collect(Collectors.toList());		return getMemberResponseList;	}	@Override	@Transactional	public void deleteMember(DeleteMemberRequest deleteMember, int memberId) {		memberTeamRepository.deleteByMemberMemberIdAndTeamTeamId(deleteMember.getMemberId(), deleteMember.getTeamId());	}}