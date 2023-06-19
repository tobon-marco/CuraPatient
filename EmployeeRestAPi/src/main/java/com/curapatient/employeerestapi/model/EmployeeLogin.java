package com.curapatient.employeerestapi.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.springframework.stereotype.Component;

@Entity
@Table(name="Employee_Login")
public class EmployeeLogin {

    @Id
    @Column(name="username")
    private String username;
    @Transient
    private String password;

    @Column(name="password_hash")
    private String passwordHash;

    @Column(name="employee_id")
    private long employeeId;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(long employeeId) {
        this.employeeId = employeeId;
    }

    @Override
    public String toString() {
        return "EmployeeLogin{" +
                "username='" + username + '\'' +
                ", passwordHash='" + passwordHash + '\'' +
                ", employeeId=" + employeeId +
                '}';
    }
}