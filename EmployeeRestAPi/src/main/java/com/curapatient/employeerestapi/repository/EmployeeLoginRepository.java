package com.curapatient.employeerestapi.repository;

import com.curapatient.employeerestapi.model.EmployeeLogin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeLoginRepository extends CrudRepository<EmployeeLogin, String> {

    Optional<EmployeeLogin> findByUsernameAndPasswordHash(String username, String passwordHash);
}
