package com.whitemind.cogit.code.service;

import com.whitemind.cogit.code.dto.request.CodeRequest;
import com.whitemind.cogit.code.dto.response.CodeDetailResponse;
import com.whitemind.cogit.code.dto.response.GetCodeHistoryResponse;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface CodeService {
    void saveCode(CodeRequest codeRequest, String uuid, int memberId);

    CodeDetailResponse getCodeDetail(int codeId);

    List<GetCodeHistoryResponse> getCodeHistory(int memberId, int scheduleId);

    List<GetCodeHistoryResponse> getMyCodeHistory(int questId, String platform, int page, HttpServletRequest request);

    List<GetCodeHistoryResponse> getMyAllCodeHistory(int page, HttpServletRequest request);

    List<Integer> getMemberCodeId(int memberId, int algorithmQuestId);
}
