import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, CellValueChangedEvent, ColDef, GridApi, GridReadyEvent, IRowNode, RowSelectedEvent, SelectionChangedEvent } from 'ag-grid-community';
import { Observable } from 'rxjs/internal/Observable';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee, SearchObject } from 'src/interfaces';



@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent {
  public errorContent: string = "";


  public searchOption: 'name' | 'employee_id' = 'name';



  @Output()
  public deleteEmployeeEvent: EventEmitter<Employee> = new EventEmitter<Employee>();

  @Output()
  public searchQueryEvent: EventEmitter<SearchObject> = new EventEmitter<SearchObject>();
  
  @Output()
  public updateEmployeesEvent: EventEmitter<Employee[]> = new EventEmitter<Employee[]>();

  public toDelete: Employee | null = null;

  public searchTerm: any;

  // AG GRID 

  @Input()
  // public employeeList!: Observable<Employee[]>;
  public employeeList!: Employee[];

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
    { field: 'employee_id', editable: false, headerName: 'Employee ID', sort: 'asc' },
    { field: 'name', editable: true },
    { field: 'phone_number', editable: true, headerName: 'Phone Number' },
    { field: 'supervisors', editable: true }
  ]


  public changedRows : { [key: string]: Employee} = {};
  objectKeys = Object.keys

  // DefaultColDef
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };
  private gridApi!: GridApi<Employee>;

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;


  constructor(private employeeService: EmployeeService) {
  }


  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.sizeToFit();
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit({
      defaultMinWidth: 100,
      columnLimits: [{ key: 'country', minWidth: 900 }],
    });
  }

  onRowSelected(event: RowSelectedEvent) {
    this.toDelete = event.node.data;
  }

  deleteEmployee(): void {
    if (this.toDelete !== null) {
      this.deleteEmployeeEvent.emit(this.toDelete);
    }
  }
  updateEmployees(): void {
      this.updateEmployeesEvent.emit(Object.values(this.changedRows));
  }
  onSelectionChanged(event: SelectionChangedEvent) {
    var rowCount = event.api.getSelectedNodes().length;
    if (rowCount === 0) {
      this.toDelete = null;
    }
  }

  onCellValueChanged(params: CellValueChangedEvent): void {
    // if (params.oldValue !== params.newValue) {
    //   var column = params.column;
    //   params.colDef.cellStyle = { 'background-color': 'cyan' };
    //   params.api.refreshCells({
    //     force: true,
    //     columns: [column],
    //     rowNodes: [params.node]
    //   });
    // }
    this.changedRows[params.data.employee_id] = params.data;
  }

  updateSearchOption(event: any) {
    this.searchOption = event.target.value;
    this.searchTerm = undefined;
  }
  searchFor(): void {
    if (this.searchTerm !== '') {
      this.searchQueryEvent.emit({
        searchOption: this.searchOption,
        searchQuery: this.searchTerm
      });
    }
  }
}
