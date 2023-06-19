package com.curapatient.employeerestapi.security;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class EmployeePrincipalAuthToken extends AbstractAuthenticationToken {

    private EmployeePrincipal employeePrincipal;
    public EmployeePrincipalAuthToken(EmployeePrincipal employeePrincipal){
        super(employeePrincipal.getAuthorities());
        this.employeePrincipal = employeePrincipal;
        setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public EmployeePrincipal getPrincipal() {
        return employeePrincipal;
    }
}
