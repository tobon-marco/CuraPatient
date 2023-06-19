package com.curapatient.employeerestapi.model;

import java.io.Serializable;

public class JwtEmployee implements Serializable {
    String jwtToken;

    Employee employee;

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
