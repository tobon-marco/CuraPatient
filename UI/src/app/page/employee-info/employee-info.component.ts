import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Employee } from 'src/interfaces';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent  implements OnInit{

  public employee: Employee = { 
    employee_id: null,
    name: null,
    phone_number: null,
    supervisors: null
  };
  constructor(private storageService: StorageService)
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

}
