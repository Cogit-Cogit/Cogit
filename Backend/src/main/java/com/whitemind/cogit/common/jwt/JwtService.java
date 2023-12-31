package com.whitemind.cogit.common.jwt;

import java.util.Date;

import com.whitemind.cogit.common.entity.JWT;
import com.whitemind.cogit.member.entity.Member;
import com.whitemind.cogit.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import javax.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtService {
    private final MemberRepository memberRepository;

    public static final Logger logger = LoggerFactory.getLogger(JwtService.class);

    @Value("${JWT_KEY_SIZE_BITS}")
    private String KEY_SIZE_BITS; // 키의 비트 수 (256비트 사용)

    @Value("${ACCESS_TOKEN_VALID_TIME}")
    private String ACCESS_TOKEN_VALID_TIME;

    @Value("${REFRESH_TOKEN_VALID_TIME}")
    private String REFRESH_TOKEN_VALID_TIME;

    @Value("${JWT_SECRET_KEY}")
    private String SECRET_KEY;

    public <T> JWT createAccessToken(String key, T data) {
        return create(key, data); // ms
    }

    /**
     * subject : sub의 value로 들어갈 토큰 제목
     * key : claim의 키
     * data : claim에 담을 value
     * expire : 토큰 유효기간 설정을 위한 값(밀리초 단위)
     * jwt 토큰의 구성 : header+payload+signature
     */
    public <T> JWT create(String key, T data) {
        // Payload : 토큰 제목 (Subject), 생성일 (IssuedAt), 유효기간 (Expiration), 데이터 (Claim)
        Claims claims = Jwts.claims()
                // 토큰 제목 access-token/refresh-token
                .setSubject("access-token")
                // 생성일
                .setIssuedAt(new Date());

        // 저장할 data의 key, value => memberId, ...
        claims.put(key, data);

        String accessToken = Jwts.builder()
                // Header : 해쉬 알고리즘, 토큰 타입
                .setHeaderParam("alg", "HS256")
                .setHeaderParam("typ", "JWT")
                // Payload
                .setClaims(claims)
                // 만료일 (유효기간)
                .setExpiration(new Date(System.currentTimeMillis() + Long.parseLong(ACCESS_TOKEN_VALID_TIME) * 1000L))
                // Signature : secret key를 활용한 암호화
                .signWith(SignatureAlgorithm.HS256, this.generateKey())
                .compact(); // 직렬화 처리

        Claims refreshClaims = Jwts.claims()
                // 토큰 제목 access-token/refresh-token
                .setSubject("refresh-token")
                // 생성일
                .setIssuedAt(new Date());

        refreshClaims.put(key, data);

        String refreshToken = Jwts.builder()
                // Header : 해쉬 알고리즘, 토큰 타입
                .setHeaderParam("alg", "HS256")
                .setHeaderParam("typ", "JWT")
                // Payload
                .setClaims(refreshClaims)
                // 만료일 (유효기간)
                .setExpiration(new Date(System.currentTimeMillis() + Long.parseLong(REFRESH_TOKEN_VALID_TIME)))
                // Signature : secret key를 활용한 암호화
                .signWith(SignatureAlgorithm.HS256, this.generateKey())
                .compact(); // 직렬화 처리

        return JWT.builder().accessToken(accessToken).refreshToken(refreshToken).key(key).build();
    }

    // Signature에 사용될 secret key 생성
    private byte[] generateKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes()).getEncoded();
    }

    public Integer extractMemberIdFromAccessToken(HttpServletRequest request) throws Exception {
        log.info("JwtService_extractUserIdFromAccessToken | Access Token 에서 userCI 추출");
        String accessToken = request.getHeader("Authorization");
        if(accessToken == null)
            throw new Exception();

        try {
            // setSigningKey : JWS 서명 검증을 위한  secret key 세팅
            // parseClaimsJws : 파싱하여 원본 jws 만들기
            // Claims 는 Map의 구현체 형태
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(this.generateKey()).build().parseClaimsJws(accessToken.split(" ")[1]);

            System.out.println(claims.getBody().get("memberId", Integer.class));
            return claims.getBody().get("memberId", Integer.class);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return -1;
    }

    public boolean validateToken(String accessToken) {
        log.info("JwtService_validateToken | JWT토큰의 유효성 + 만료일자 확인");
        try {
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(this.generateKey()).build().parseClaimsJws(accessToken);
            if(claims.getBody().getExpiration().getTime() - claims.getBody().getIssuedAt().getTime() != Long.parseLong(ACCESS_TOKEN_VALID_TIME)){
                log.info("토큰이 유효하지 않음");
                return false;
            }
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    public <T> JWT refreshAccessToken(String refreshToken) {
        log.info("JwtService_refreshAccessToken | AccessToken 재발급");
        //TODO: member 없을 때 예외처리
        Member member = memberRepository.findMembersByMemberRefreshToken(refreshToken.split(" ")[1]);

        Claims claims = Jwts.claims()
                // 토큰 제목 access-token/refresh-token
                .setSubject("access-token")
                // 생성일
                .setIssuedAt(new Date());

        // 저장할 data의 key, value => memberId, ...
        claims.put("memberId", member.getMemberId());

        String accessToken = Jwts.builder()
                // Header : 해쉬 알고리즘, 토큰 타입
                .setHeaderParam("alg", "HS256")
                .setHeaderParam("typ", "JWT")
                // Payload
                .setClaims(claims)
                // 만료일 (유효기간)
                .setExpiration(new Date(System.currentTimeMillis() + Long.parseLong(ACCESS_TOKEN_VALID_TIME)))
                // Signature : secret key를 활용한 암호화
                .signWith(SignatureAlgorithm.HS256, this.generateKey())
                .compact(); // 직렬화 처리
        return JWT.builder().accessToken(accessToken).key("memberId").build();
    }
}
