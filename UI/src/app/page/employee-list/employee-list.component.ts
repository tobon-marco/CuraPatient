import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridApi, GridReadyEvent, RowSelectedEvent, SelectionChangedEvent } from 'ag-grid-community';
import { EmployeeService } from 'src/app/services/employee.service';
import { StorageService } from 'src/app/services/storage.service';
import { Employee, SearchObject } from 'src/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  public employee: Employee = {
    employee_id: null,
    name: null,
    phone_number: null,
    supervisors: null
  };

  public employeeList!: Employee[];

  public errorContent: string = "";



  public toDelete: Employee | null = null;



  // AG GRID 
  public rowData$!: Observable<Employee[]>;
  public columnDefs: ColDef[] = [
    {
      checkboxSelection: true,
      suppressMenu: true,
      maxWidth: 50,
      cellEditor: 'agCheckboxCellEditor',
      singleClickEdit: true,
      sortable: false,
      filter: false
    },
    { field: 'employee_id', editable: false, headerName: 'Employee ID' },
    { field: 'name', editable: true },
    { field: 'phone_number', editable: true, headerName: 'Phone Number' },
    { field: 'supervisors', editable: true }
  ]

  // DefaultColDef
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };
  private gridApi!: GridApi<Employee>;

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;




  constructor(
    private storageService: StorageService,
    private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.employee = this.storageService.getUser();
    // this.employeeList = this.employeeService.getAllEmployees();
    this.getRows();
  }

  getRows() {
    this.employeeService.getAllEmployees().subscribe({
      next: data => {
        this.employeeList = data;
      },
      error: err => {
        // this.errorMessage = err.error.message;
      }
    });
  }

  logout(): void {
    this.storageService.clean();
    window.location.reload();
  }

  deleteEmployee(employeeToDelete: Employee): void {
    if (employeeToDelete.employee_id !== null) {
      this.employeeService.deleteEmployeeById(employeeToDelete.employee_id).subscribe({
        next: data => {
          this.getRows();
        },
        error: err => {
          // this.errorMessage = err.error.message;
          // this.isLoginFailed = true;
        }
      });
    }
  }

  updateEmployeeList(searchObject: SearchObject): void {

    if (searchObject.searchOption === 'employee_id') {
      let idToSearch = Number(searchObject.searchQuery);
      if (!isNaN(idToSearch)) {

        this.employeeService.getEmployeeById(idToSearch).subscribe({
          next: data => {
            this.employeeList = [data];
          },
          error: err => {
            // this.errorMessage = err.error.message;
            // this.isLoginFailed = true;
            this.employeeList = []
          }
        });

      }
    }
    else {
      this.employeeService.getEmployeesByName(searchObject.searchQuery).subscribe({
        next: data => {
          this.employeeList = data;
        },
        error: err => {
          // this.errorMessage = err.error.message;
          // this.isLoginFailed = true;
          this.employeeList = []
        }
      });
    }
  }


  updateEmployeeData(toUpdate: Employee[]): void {
    if (toUpdate.length === 1) {
      this.employeeService.updateEmployee(toUpdate[0]).subscribe({
        next: data => {
          this.getRows();
        },
        error: err => {
          // this.errorMessage = err.error.message;
          // this.isLoginFailed = true;
        }
      });
    }
    else {
      this.employeeService.updateBatchEmployees(toUpdate);
    }
  }
  isAdmin(): boolean {
    return this.storageService.isAdmin();
  }
}
