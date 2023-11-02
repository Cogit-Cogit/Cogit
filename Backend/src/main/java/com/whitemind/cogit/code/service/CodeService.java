package com.whitemind.cogit.code.service;

import com.whitemind.cogit.code.dto.request.CodeRequest;

public interface CodeService {
    void saveCode(CodeRequest codeRequest, String uuid, int memberId);
}
