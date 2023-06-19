package com.curapatient.employeerestapi.controller;

import com.curapatient.employeerestapi.model.Employee;
import com.curapatient.employeerestapi.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:8080"}, maxAge = 3600, allowCredentials="true")
//@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/api/employee")
public class EmployeeController {


    @Autowired
    EmployeeService employeeService;

//    @CrossOrigin(origins = {"http://localhost:4200", "http://localhost:8080"})
    @CrossOrigin
    @GetMapping({"", "/fetch/all"})
    public ResponseEntity<List<Employee>> getEmployees(@RequestParam(value = "name", required = false)String searchTerm){
        try{
            return ResponseEntity.ok(employeeService.searchForEmployees(searchTerm));
        }
        catch (Exception e)
        {
            return ResponseEntity.internalServerError().build();
        }
    }
    //NOT SURE IF THEY ARE ONLY PASSING IT AS A PATHVARIABLE OR REQUEST PARAM
    // AS IM MAKING A REST API I WILL PUT PATH VARIABLE
//    @CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
    @GetMapping({"/id/{employeeId}", "/fetch/id/{employeeId}"})
//    public List<Employee> getEmployees(@RequestParam("employeeId")long employeeId)
    public ResponseEntity<Employee> getEmployees(@PathVariable("employeeId")long employeeId)
    {
        try {
            Optional<Employee> employeeOptional = employeeService.getEmployee(employeeId);
            return employeeOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        }
        catch (Exception e)
        {
            return ResponseEntity.internalServerError().build();
        }
    }

//    @CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
    @DeleteMapping({"/id/{employeeId}", "/delete/id/{employeeId}"})
    public ResponseEntity<Object> deleteEmployee(@PathVariable("employeeId")long employeeId)
    {
        try{
            employeeService.deleteEmployee(employeeId);
            return ResponseEntity.noContent().build();
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

//    @CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
    @DeleteMapping("/delete/all")
    public ResponseEntity<Object> deleteAllEmployee()
    {
        try{
            employeeService.deleteAllEmployee();
            return ResponseEntity.noContent().build();
        }
        catch (Exception e)
        {
            return ResponseEntity.internalServerError().build();
        }
    }

//    @CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
    @PutMapping({"/id/{id}", "/update/id/{id}"})
    public ResponseEntity<Employee> updateEmployee(@PathVariable long id, @RequestBody Employee employeeDetails) {
        try {
            Employee resp = employeeService.updateEmployee(id, employeeDetails);
            if (resp == null)
            {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(resp);
        }
        catch (Exception e)
        {
            return ResponseEntity.internalServerError().build();
        }
    }
    @PutMapping({"/batch", "/update/batch"})
    public ResponseEntity<String> updateEmployeeBatch(@RequestBody List<Employee> employeeDetails) {
        try {

            employeeService.updateEmployeeBatch(employeeDetails);
            return ResponseEntity.ok().build();
        }
        catch (Exception e)
        {
            return ResponseEntity.internalServerError().build();
        }
    }
//    @CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
    @PostMapping({"", "/add"})
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee)
    {
        try{
            return new ResponseEntity<>(employeeService.addEmployee(employee), HttpStatus.CREATED);
        }
        catch (Exception e)
        {
            return ResponseEntity.internalServerError().build();
        }
    }



}
