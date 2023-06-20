import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/interfaces';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private EMPLOYEE_API = "http://localhost:8080/api/employee/";
  constructor(
    private httpClient: HttpClient
  ) { }

  getAllEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.EMPLOYEE_API + 'fetch/all');
    // return this.httpClient.get<Employee[]>(this.EMPLOYEE_API);
  }


  getEmployeeById(employee_id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(this.EMPLOYEE_API + 'fetch/id/' + employee_id);
  }

  getEmployeesByName(name: string): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.EMPLOYEE_API + 'fetch/all', {
      params: {
        name: name
      }
    });
  }

  deleteEmployeeById(employee_id: number): Observable<any>{
    return this.httpClient.delete<any>(this.EMPLOYEE_API + 'delete/id/' + employee_id);
  }
  
  deleteAllEmployees(): Observable<any>{
    return this.httpClient.delete<any>(this.EMPLOYEE_API + 'delete/all');
  }

  updateEmployee(employeeToUpdate: Employee): Observable<any>{
    return this.httpClient.put<Employee>(
      this.EMPLOYEE_API + 'update/id/' + employeeToUpdate.employee_id,
      employeeToUpdate,
      httpOptions
      );
  }

  updateBatchEmployees(employeesToUpdate: Employee[]): Observable<Employee>{
    return this.httpClient.put<Employee>(
      this.EMPLOYEE_API + 'batch',
      employeesToUpdate,
      httpOptions
      );
  }

  addEmployee(employeeToAdd: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(
      this.EMPLOYEE_API + 'add',
      employeeToAdd,
      httpOptions
      );

  }


}
