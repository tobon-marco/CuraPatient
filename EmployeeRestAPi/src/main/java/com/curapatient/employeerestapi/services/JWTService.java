package com.curapatient.employeerestapi.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.curapatient.employeerestapi.model.Employee;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Component
public class JWTService  implements Serializable {

    @Value("{jwt.secret")
    private String jwtSecret;


    public String generateToken(String username, String password) throws Exception
    {
        return JWT.create()
                .withIssuer("RESTApi")
                .withSubject(username)
                .withClaim("data", "data1")
                .withIssuedAt(new Date())
                .withExpiresAt(Instant.now().plus(8, ChronoUnit.HOURS))
                .sign(Algorithm.HMAC256(jwtSecret));
    }


    public String generateToken(Employee employee) throws Exception
    {
        return JWT.create()
                .withIssuer("RESTApi")
                .withSubject(employee.getName())
                .withClaim("employee_id", employee.getEmployeeId())
                .withClaim("supervisors", employee.getSupervisors())
                .withClaim("phone_number", employee.getPhoneNumber())
                .withIssuedAt(new Date())
                .withExpiresAt(Instant.now().plus(8, ChronoUnit.HOURS))
                .sign(Algorithm.HMAC256(jwtSecret));
    }


    public DecodedJWT decodeToken(String token)
    {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(jwtSecret))
                .withIssuer("RESTApi")
                .build();
        return verifier.verify(token);
    }
}
