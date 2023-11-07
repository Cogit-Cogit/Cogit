package com.whitemind.cogit.code.service;

import com.whitemind.cogit.code.dto.request.CodeRequest;
import com.whitemind.cogit.code.dto.response.CodeDetailResponse;

public interface CodeService {
    void saveCode(CodeRequest codeRequest, String uuid, int memberId);

    CodeDetailResponse getCodeDetail(int codeId);
}
