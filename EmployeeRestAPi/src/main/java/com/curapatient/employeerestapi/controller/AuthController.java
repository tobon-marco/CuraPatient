package com.curapatient.employeerestapi.controller;

import com.curapatient.employeerestapi.model.Employee;
import com.curapatient.employeerestapi.model.EmployeeLogin;
import com.curapatient.employeerestapi.model.JwtEmployee;
import com.curapatient.employeerestapi.services.EmployeeService;
import com.curapatient.employeerestapi.services.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    EmployeeService employeeService;

    @Autowired
    JWTService jwtService;


    @CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
    @PostMapping("/login")
    public ResponseEntity<JwtEmployee> login(@RequestBody @Validated EmployeeLogin employeeLogin)
    {
        try {
            Optional<Employee> empObj = employeeService.getEmployeeFromLogin(employeeLogin);
            if (empObj.isPresent()) {
                Employee empData = empObj.get();
                //CREATE JWT TOKEN
                String jwt = jwtService.generateToken(empData);

                JwtEmployee resp = new JwtEmployee();
                resp.setJwtToken(jwt);
                resp.setEmployee(empData);
                return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwt).body(resp);
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        catch (Exception e)
        {
            return ResponseEntity.internalServerError().build();
        }
    }

    @CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestBody HashMap<String, String> body)
    {
        String jwt = null;
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwt).build();
    }

}
