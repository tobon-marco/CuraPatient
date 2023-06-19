package com.curapatient.employeerestapi.services;

import com.curapatient.employeerestapi.model.Employee;
import com.curapatient.employeerestapi.model.EmployeeLogin;
import com.curapatient.employeerestapi.repository.EmployeeLoginRepository;
import com.curapatient.employeerestapi.repository.EmployeeRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.util.Streamable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    static Logger log = LoggerFactory.getLogger(EmployeeService.class);

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeLoginRepository employeeLoginRepository;


    @Value("${security.salt}")
    private String salt;

    public Optional<Employee> getEmployee(long employeeId) {
        String methodName = "getEmployee";
        log.info(methodName + "::: Looking for employee with id: " + employeeId);
        Optional<Employee> employeeFound = employeeRepository.findById(employeeId);
        log.info(methodName + "::: Found employee with id: " + employeeId + ":::" + employeeFound.isPresent());
        return employeeFound;

    }

    public List<Employee> searchForEmployees(String queryParam)
    {
        if (queryParam != null)
        {
            Optional<List<Employee>> res = employeeRepository.findByNameContainingIgnoreCase(queryParam);
            return res.orElse(new ArrayList<>());
        }
        else {
            return getAllEmployees();
        }
    }


    public List<Employee> getAllEmployees() {
        Iterable<Employee> employeeIterable = employeeRepository.findAll();
        return Streamable.of(employeeIterable).toList();
    }

    @Transactional
    public void deleteEmployee(long employeeId) {
        int count = employeeRepository.deactivatEmployeeById(employeeId);
        System.out.println("Updated " + count);
    }

    @Transactional
    public void deleteAllEmployee() {
        employeeRepository.deleteAll();
    }

    @Transactional
    public Employee updateEmployee(long id, Employee employee) {
        Optional<Employee> employeeToUpdate = getEmployee(id);
        if (employeeToUpdate.isPresent()) {
            Employee employeeToUpdateObj = employeeToUpdate.get();
            employeeToUpdateObj.setPhoneNumber(employee.getPhoneNumber());
            employeeToUpdateObj.setName(employee.getName());
            employeeToUpdateObj.setSupervisors(employee.getSupervisors());
            return addEmployee(employeeToUpdateObj);
        }
        return null;
    }
    @Transactional
    public void updateEmployeeBatch(List<Employee> employees) throws Exception {
        for(Employee e: employees)
        {
            Optional<Employee> employeeToUpdate = getEmployee(e.getEmployeeId());
            if (employeeToUpdate.isPresent()) {
                Employee employeeToUpdateObj = employeeToUpdate.get();
                employeeToUpdateObj.setPhoneNumber(e.getPhoneNumber());
                employeeToUpdateObj.setName(e.getName());
                employeeToUpdateObj.setSupervisors(e.getSupervisors());
                addEmployee(employeeToUpdateObj);
                employeeRepository.save(employeeToUpdateObj);
            }
            throw new Exception("User not found");
        }
    }
    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Optional<Employee> getEmployeeFromLogin(EmployeeLogin employeeLogin) throws Exception
    {
        employeeLogin.setPasswordHash(hashPassword(employeeLogin.getPassword()));
        System.out.println("Hashed password : " + employeeLogin.getPasswordHash());

        Optional<EmployeeLogin> result = employeeLoginRepository.findByUsernameAndPasswordHash(employeeLogin.getUsername(), employeeLogin.getPasswordHash());
        if (result.isPresent())
        {
            EmployeeLogin emp = result.get();
            return employeeRepository.findByEmployeeIdAndActiveTrue(emp.getEmployeeId());
        }
        return Optional.empty();
    }


    String hashPassword(String password) throws NoSuchAlgorithmException
    {
        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(salt.getBytes());

        byte[] bytes = md.digest(password.getBytes());
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < bytes.length; i++) {
            sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
        }
        // Get complete hashed password in hex format
        return sb.toString();
    }

}
