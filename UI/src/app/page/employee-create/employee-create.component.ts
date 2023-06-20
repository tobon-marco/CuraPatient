import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { StorageService } from 'src/app/services/storage.service';
import { Employee } from 'src/interfaces';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent {

  public employee: Employee = { 
    employee_id: null,
    name: null,
    phone_number: null,
    supervisors: null
  };


  public employeeToAdd: Employee = {
    employee_id: null,
    name: null,
    phone_number: null,
    supervisors: null
  }


  constructor(
    private storageService: StorageService, 
    private employeeService: EmployeeService,
    private router: Router
    )
  {
  }

  ngOnInit(): void {
    this.employee =  this.storageService.getUser();
  }

  logout(): void {
    this.storageService.clean();
    window.location.reload();
  }

  isAdmin(): boolean {
    return this.storageService.isAdmin();
  }

  createEmployee(employee: Employee)
  {
    this.employeeService.addEmployee(employee).subscribe({
      next: data => {
        // TODO show pop up that user was added succesfully on close route them to list
        this.router.navigate(['/employee/list'])
      },
      error: err => {
        // TODO pop up to show user failed 
        // STAY ON PAGE TO RETRY? 
      }
    });
  }

}
