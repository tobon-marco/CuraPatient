import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from 'src/interfaces';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input("employee")
  employeeToShow!: Employee;
  
  @Input("editable")
  editable: boolean = false


  @Output()
  employeeUpdatedEvent: EventEmitter<Employee> = new EventEmitter<Employee>();


  constructor() {

  }

  onChange(field: string, event: Event): void
  {
  }

  onSubmit(): void {
    debugger;
    this.employeeUpdatedEvent.emit(this.employeeToShow);
  }




}
