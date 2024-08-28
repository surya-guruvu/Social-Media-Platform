package com.smplatform.backend.service;


// import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.smplatform.backend.model.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.function.Function;
import java.util.Date;
import java.util.Map;
import java.util.HashMap;


@Service
public class JwtUtil {

    // @Value("${jwt.secret}")
    // private static String secret;
    private static String secret = "1234-5678-9876-5432-1012";

    private static Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    public static <T> T extractClaim(String token, Function<Claims,T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public static String extractIdentifier(String token){
        return extractClaim(token, Claims::getSubject);
    }

    public static Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    public static Boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    private static String createToken(Map<String,Object> claims, String subject){
        return Jwts.builder().setClaims(claims).setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public static String generateToken(String identifier){
        Map<String,Object> claims = new HashMap<>();
        return createToken(claims, identifier);
    }

    public static Boolean validateToken(String token, User user) {
        final String identifier = extractIdentifier(token);

        return ((identifier.equals(user.getUsername()) || (identifier.equals(user.getEmail()))) && !isTokenExpired(token));
    }

}
