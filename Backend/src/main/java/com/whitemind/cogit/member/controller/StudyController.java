package com.whitemind.cogit.member.controller;import java.util.List;import javax.servlet.http.HttpServletRequest;import com.whitemind.cogit.member.dto.request.AddMemberRequest;import com.whitemind.cogit.member.dto.request.CreateStudyRequest;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.PostMapping;import org.springframework.web.bind.annotation.RequestBody;import org.springframework.web.bind.annotation.RequestMapping;import org.springframework.web.bind.annotation.RestController;import com.whitemind.cogit.common.response.ResponseResult;import com.whitemind.cogit.member.dto.response.GetMemberResponse;import com.whitemind.cogit.member.service.StudyService;import lombok.RequiredArgsConstructor;import lombok.extern.slf4j.Slf4j;@Slf4j@RestController@RequiredArgsConstructor@RequestMapping("/study")public class StudyController {	private final StudyService studyService;	@PostMapping("/create")	public ResponseResult createStudy(@RequestBody CreateStudyRequest study, HttpServletRequest request) throws Exception {		log.info(study.getStudyName());		studyService.createStudy(study.getStudyName(), (Integer) request.getAttribute("memberId"));		return ResponseResult.successResponse;	}	@PostMapping("/member/add")	public ResponseResult addMember(@RequestBody AddMemberRequest addMember, HttpServletRequest request) throws Exception {		studyService.addMember(addMember, (Integer) request.getAttribute("memberId"));		return ResponseResult.successResponse;	}	@GetMapping("/memberList")	public List<GetMemberResponse> getMemberList(int teamId) {		return studyService.getMemberList(teamId);	}}