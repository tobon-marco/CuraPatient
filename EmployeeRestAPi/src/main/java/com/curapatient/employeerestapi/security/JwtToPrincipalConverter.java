package com.curapatient.employeerestapi.security;

import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JwtToPrincipalConverter {

    public EmployeePrincipal convertToken(DecodedJWT jwt)
    {
        EmployeePrincipal employeePrincipal = new EmployeePrincipal();
        employeePrincipal.setEmployeeId(jwt.getClaim("employee_id").asLong());
        employeePrincipal.setName(jwt.getSubject());
        employeePrincipal.setPhoneNumber(jwt.getClaim("phone_number").asString());
        employeePrincipal.setSupervisors(jwt.getClaim("supervisors").asString());
        employeePrincipal.setActive(true);
        employeePrincipal.setAuthorities(extractAuthoritiesFromClaim(jwt));
        return employeePrincipal;
    }


    private List<SimpleGrantedAuthority> extractAuthoritiesFromClaim(DecodedJWT jwt)
    {
        Claim claim = jwt.getClaim("authorities");
        if (claim.isNull() || claim.isMissing()) {
            return List.of();
        }
        return claim.asList(SimpleGrantedAuthority.class);
    }
}
