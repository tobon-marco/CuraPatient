package com.curapatient.employeerestapi.repository;

import com.curapatient.employeerestapi.model.Employee;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, Long> {

    @Modifying
    @Query("Update Employee set active = false where employeeId = :id")
    int deactivatEmployeeById(@Param("id")long id);

    Optional<Employee> findByEmployeeIdAndActiveTrue(long employeeId);


    Optional<List<Employee>> findByNameContainingIgnoreCase(String query);

}