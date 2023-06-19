package com.curapatient.employeerestapi.security;

import com.curapatient.employeerestapi.services.JWTService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.antlr.v4.runtime.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private JwtToPrincipalConverter jwtToPrincipalConverter;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        getTokenFromReq(request)
                .map(jwtService::decodeToken)
                        .map(jwtToPrincipalConverter::convertToken)
                                .map(EmployeePrincipalAuthToken::new)
                                        .ifPresent(auth -> SecurityContextHolder.getContext().setAuthentication(auth));
        filterChain.doFilter(request,response);
    }

    private Optional<String> getTokenFromReq(HttpServletRequest request)
    {
        String token = request.getHeader("Authorization");
        if (StringUtils.hasText(token) && token.startsWith("Bearer "))
        {
            return Optional.of(token.substring(7));
        }
        return Optional.empty();
    }

}
