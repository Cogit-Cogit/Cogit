package com.whitemind.cogit.auth.service;

import com.whitemind.cogit.auth.dto.GitBlobResponseDto;
import com.whitemind.cogit.auth.dto.GitRefResponseDto;
import com.whitemind.cogit.code.dto.request.CodeRequest;
import com.whitemind.cogit.common.jwt.JwtService;
import com.whitemind.cogit.member.dto.UpdateMemberDto;
import com.whitemind.cogit.member.entity.Member;
import com.whitemind.cogit.member.repository.MemberRepository;
import com.whitemind.cogit.member.service.StudyService;
import com.whitemind.cogit.schedule.dto.request.CreateScheduleRequest;
import com.whitemind.cogit.schedule.entity.Schedule;
import com.whitemind.cogit.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.sql.Update;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;

@Slf4j
@RequiredArgsConstructor
@Service
public class GithubServiceImple implements GithubService {
    @Value("${GITHUB_CLIENT_ID}")
    private String clientId;

    @Value("${GITHUB_CLIENT_SECRET}")
    private String clientSecret;

    private final MemberRepository memberRepository;
    private final JwtService jwtService;

    /**
     * 유저 accessToken을 사용하여 유저 정보 반환
     * @param accessToken
     * @return
     * @throws IOException
     */
    public UpdateMemberDto getGithubUserInfo(String accessToken) throws IOException {
        log.info("getGithubUserInfo | 유저 정보 요청");
        URL url = new URL("https://api.github.com/user");
        HttpURLConnection conn = (HttpURLConnection)  url.openConnection();
        conn.setDoInput(true);
        conn.setDoOutput(true);
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Accept", "application/json");
        conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36");
        conn.setRequestProperty("Authorization","Bearer " + accessToken);

        int responseCode = conn.getResponseCode();
        String responseData = getResponse(conn, responseCode, 200);
        JSONObject jObject = new JSONObject(responseData);

        Member member = memberRepository.findMembersByMemberId(jObject.getInt("id"));

        UpdateMemberDto updateMemberDto = null;

        if (member != null)
            updateMemberDto = UpdateMemberDto.builder()
                    .memberId(member.getMemberId())
                    .memberGitUrl(member.getMemberGitUrl())
                    .memberName(member.getMemberName())
                    .memberNickname(member.getMemberNickname())
                    .memberProfileImage(member.getMemberProfileImage())
                    .memberRefreshToken(member.getMemberRefreshToken())
                    .memberGitAccessToken(accessToken)
                    .build();
        else
            updateMemberDto = new UpdateMemberDto(jObject.getInt("id"), jObject.getString("html_url"), jObject.getString("login"), jObject.getString("login"), "", jObject.getString("avatar_url"), accessToken);

        conn.disconnect();
        return updateMemberDto;
    }

    /**
     * Github 인가 코드를 사용하여 유저 git AccessToken 발급
     * @param code
     * @return
     * @throws IOException
     */
    public String getAccessToken(String code) throws IOException {
        log.info("getAccessToken | Github AccessToken 요청");
        URL url = new URL("https://github.com/login/oauth/access_token");
        HttpURLConnection conn = (HttpURLConnection)  url.openConnection();
        conn.setDoInput(true);
        conn.setDoOutput(true);
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Accept", "application/json");
        conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36");

        try (BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()))) {
            bw.write("client_id="+clientId+"&client_secret="+clientSecret+"&code=" + code);
            bw.flush();
        }

        int responseCode = conn.getResponseCode();

        String responseData = getResponse(conn, responseCode, 200);

        JSONObject jObject = new JSONObject(responseData);

        String accessToken = jObject.getString("access_token");
        conn.disconnect();

        return accessToken;
    }

    @Override
    public void uploadGitCode(CodeRequest code, HttpServletRequest request) throws Exception {
        Member member = memberRepository.findMembersByMemberId(jwtService.extractMemberIdFromAccessToken(request));
        System.out.println(member.getMemberId() + " " + member.getMemberName());
        // 레포가 존재하는지 확인
        if (!getMemberRepo(member)) {
            log.info("getMemberRepo | 유저 코깃코깃 레포가 존재하지 않습니다.");
            createRepo(member);
        }

        GitRefResponseDto gitRefResponseDto = getRef(member);
        // 파일에 대한 Blob 생성
        // TODO 리드미도 생성할 것인지?
        GitBlobResponseDto gitCodeBlobResponseDto = getBlob(member, code);
        // treeSha 생성
        String treeSha = getTreeSha(member, gitRefResponseDto.getRefSha(), new GitBlobResponseDto[]{gitCodeBlobResponseDto});
        // commitSha 생성
        String commitSha = getCommitSha(member, treeSha, gitRefResponseDto.getRefSha(), code);
        // head 업데이트(푸시)
        updateHead(member, gitRefResponseDto.getRef(), commitSha);
    }

    public void createRepo(Member member) throws IOException {
        log.info("createRepo | 유저 코깃코깃 레포를 생성합니다.");
        String url = "https://api.github.com/user/repos";
        HttpURLConnection conn = requestGitAPIConnection(member, url, "POST");

        JSONObject jsonRequest = new JSONObject();
        jsonRequest.put("name", "Algorithm_Study_With_Cogit");
        jsonRequest.put("description", "코깃코깃 소스코드 저장 레포지토리입니다.");
        jsonRequest.put("private", true);
        jsonRequest.put("auto_init", true);
        // HTTP 요청 body에 JSON 객체 전달
        try (OutputStream os = conn.getOutputStream()) {
            byte[] input = jsonRequest.toString().getBytes("utf-8");
            os.write(input, 0, input.length);
        }
        int responseCode = conn.getResponseCode();
        String responseData = getResponse(conn, responseCode, 200);
        System.out.println(responseCode);
        System.out.println(responseData);
    }

    @Override
    public boolean getMemberRepo(Member member) throws IOException {
        log.info("getMemberRepo | 유저 코깃코깃 레포 존재 여부 확인");
        String url = "https://api.github.com/repos/" + member.getMemberName() + "/Algorithm_Study_With_Cogit";
        HttpURLConnection conn = requestGitAPIConnection(member, url, "GET");

        return conn.getResponseCode() == 200 ? true : false;
    }

    public void updateHead(Member member, String ref, String commitSha) throws IOException {
        log.info("updateHead | Github Commit Push");
        String url = "https://api.github.com/repos/" + member.getMemberName() + "/Algorithm_Study_With_Cogit/git/" + ref;
        HttpURLConnection conn = requestGitAPIConnection(member, url, "PUT");

        JSONObject jsonRequest = new JSONObject();
        jsonRequest.put("sha", commitSha);
        jsonRequest.put("force", true);
        // HTTP 요청 body에 JSON 객체 전달
        try (OutputStream os = conn.getOutputStream()) {
            byte[] input = jsonRequest.toString().getBytes("utf-8");
            os.write(input, 0, input.length);
        }

        if (conn.getResponseCode() == 200) log.info("updateHead | 커밋 성공");
        else log.info("updateHead | 커밋 실패");
    }

    public String getCommitSha(Member member, String treeSha, String refSha, CodeRequest code) throws IOException {
        log.info("getCommitSha | Github Commit SHA 생성");
        String url = "https://api.github.com/repos/" + member.getMemberName() +"/Algorithm_Study_With_Cogit/git/commits";
        HttpURLConnection conn = requestGitAPIConnection(member, url, "POST");

        JSONObject jsonRequest = new JSONObject();
        jsonRequest.put("message", code.getAlgorithmQuestPlatform() + code.getAlgorithmQuestNumber());
        jsonRequest.put("tree", treeSha);
        jsonRequest.put("parents", new String[]{ refSha });
        // HTTP 요청 body에 JSON 객체 전달
        try (OutputStream os = conn.getOutputStream()) {
            byte[] input = jsonRequest.toString().getBytes("utf-8");
            os.write(input, 0, input.length);
        }

        int responseCode = conn.getResponseCode();
        String responseData = getResponse(conn, responseCode, 201);
        JSONObject jObject = new JSONObject(responseData);
        return jObject.getString("sha");
    }

    public String getTreeSha(Member member, String refSha, GitBlobResponseDto[] tree_items) throws IOException {
        log.info("getTreeSha | Github Tree SHA 생성");
        String url = "https://api.github.com/repos/" + member.getMemberName() +"/Algorithm_Study_With_Cogit/git/trees";
        HttpURLConnection conn = requestGitAPIConnection(member, url, "POST");

        JSONObject jsonRequest = new JSONObject();
        jsonRequest.put("tree", tree_items);
        jsonRequest.put("base_tree", refSha);
        // HTTP 요청 body에 JSON 객체 전달
        try (OutputStream os = conn.getOutputStream()) {
            byte[] input = jsonRequest.toString().getBytes("utf-8");
            os.write(input, 0, input.length);
        }

        int responseCode = conn.getResponseCode();
        String responseData = getResponse(conn, responseCode, 201);
        JSONObject jObject = new JSONObject(responseData);
        return jObject.getString("sha");
    }

    public GitBlobResponseDto getBlob(Member member, CodeRequest code) throws IOException {
        log.info("getBlob | Github Blob 생성");
        String url = "https://api.github.com/repos/" + member.getMemberName() + "/Algorithm_Study_With_Cogit/git/blobs";
        HttpURLConnection conn = requestGitAPIConnection(member, url, "POST");

        JSONObject jsonRequest = new JSONObject();
        jsonRequest.put("content", b64EncodeUnicode(code.getCodeContent()));
        jsonRequest.put("encoding", "base64");
        // HTTP 요청 body에 JSON 객체 전달
        try (OutputStream os = conn.getOutputStream()) {
            byte[] input = jsonRequest.toString().getBytes("utf-8");
            os.write(input, 0, input.length);
        }

        int responseCode = conn.getResponseCode();
        String responseData = getResponse(conn, responseCode, 201);
        JSONObject jObject = new JSONObject(responseData);

        // TODO 문제 저장할 정확한 주소 정해야함
        return new GitBlobResponseDto(code.getAlgorithmQuestPlatform() + "/" +code.getAlgorithmQuestNumber() + "." + code.getCodeFileExtension(), jObject.getString("sha"), "100644", "blob");
    }

    public GitRefResponseDto getRef(Member member) throws IOException {
        log.info("getRef | Github Ref 요청");
        String url = "https://api.github.com/repos/"+ member.getMemberName() +"/Algorithm_Study_With_Cogit/git/refs/heads/main";
        HttpURLConnection conn = requestGitAPIConnection(member, url, "GET");

        int responseCode = conn.getResponseCode();
        String responseData = getResponse(conn, responseCode, 200);
        JSONObject jObject = new JSONObject(responseData);

        return new GitRefResponseDto(jObject.getString("ref"), jObject.getJSONObject("object").getString("sha"));
    }

    private String getResponse(HttpURLConnection conn, int responseCode, int validCode) throws IOException {
        StringBuilder sb = new StringBuilder();
        if (responseCode == validCode) {
            try (InputStream is = conn.getInputStream();
                 BufferedReader br = new BufferedReader(new InputStreamReader(is))) {
                for (String line = br.readLine(); line != null; line = br.readLine()) {
                    sb.append(line);
                }
            }
        }
        return sb.toString();
    }

    public HttpURLConnection requestGitAPIConnection(Member member, String apiUrl, String Method) throws IOException {
        URL url = new URL(apiUrl);
        HttpURLConnection conn = (HttpURLConnection)  url.openConnection();
        conn.setDoInput(true);
        conn.setDoOutput(true);
        conn.setRequestMethod(Method);
        conn.setRequestProperty("Accept", "application/vnd.github.v3+json");
        conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36");
        conn.setRequestProperty("Authorization","Bearer " + member.getMemberGitAccessToken());
        return conn;
    }

    public static String b64EncodeUnicode(String input) {
        byte[] bytes = input.getBytes(); // UTF-8로 인코딩된 바이트 배열 얻기
        String encoded = Base64.getEncoder().encodeToString(bytes); // base64로 인코딩
        return encoded;
    }
}
