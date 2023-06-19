package com.curapatient.employeerestapi.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Employees")
public class Employee {

//    @JsonProperty("employee_id")
    @Id
    @Column(name="EMPLOYEE_ID", updatable = false, nullable = false)
    @JsonProperty("employee_id")
    private Long employeeId;
    @JsonProperty("name")
    private String name;
    @JsonProperty("phone_number")
    private String phoneNumber;

    @JsonProperty("supervisors")
    private String supervisors;


    private boolean active;

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getSupervisors() {
        return supervisors;
    }

    public void setSupervisors(String supervisors) {
        this.supervisors = supervisors;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
