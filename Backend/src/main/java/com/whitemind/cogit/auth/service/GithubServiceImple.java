package com.whitemind.cogit.auth.service;

import com.whitemind.cogit.member.dto.Member;
import com.whitemind.cogit.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

@Slf4j
@RequiredArgsConstructor
@Service
public class GithubServiceImple implements GithubService {
    @Value("${GITHUB_CLIENT_ID}")
    private String clientId;

    @Value("${GITHUB_CLIENT_SECRET}")
    private String clientSecret;

    /**
     * 유저 accessToken을 사용하여 유저 정보 반환
     * @param accessToken
     * @return
     * @throws IOException
     */
    public Member getGithubUserInfo(String accessToken) throws IOException {
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
        String responseData = getResponse(conn, responseCode);
        JSONObject jObject = new JSONObject(responseData);

        Member member = new Member(jObject.getLong("id"), jObject.getString("html_url"), jObject.getString("login"), "", accessToken);

        conn.disconnect();
        return member;
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

        String responseData = getResponse(conn, responseCode);
        System.out.println(responseCode);
        JSONObject jObject = new JSONObject(responseData);

        String accessToken = jObject.getString("access_token");
        conn.disconnect();

        return accessToken;
    }

    private String getResponse(HttpURLConnection conn, int responseCode) throws IOException {
        StringBuilder sb = new StringBuilder();
        if (responseCode == 200) {
            try (InputStream is = conn.getInputStream();
                 BufferedReader br = new BufferedReader(new InputStreamReader(is))) {
                for (String line = br.readLine(); line != null; line = br.readLine()) {
                    sb.append(line);
                }
            }
        }
        return sb.toString();
    }
}
