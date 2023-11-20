package com.whitemind.cogit.common.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.util.Date;

public class JwtUtils {
    private static byte[] generateKey(String secretKey) {
        return Keys.hmacShaKeyFor(secretKey.getBytes()).getEncoded();
    }
    public static Jws<Claims> parseToken(String token, String secretKey) {
        System.out.println("token: " + token + "  secretKey: " + secretKey);
        return Jwts.parser().setSigningKey(generateKey(secretKey)).parseClaimsJws(token);
    }

    public static String createJwt(String nickname, String userId, String secretKey, int expiredMs) {
        Claims claims = Jwts.claims();
        claims.put("nickname", nickname);
        claims.put("userId", userId);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiredMs*1000L))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }


}