import { Component, Input } from '@angular/core';
import { Employee } from 'src/interfaces';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input("employee")
  employeeToShow: Employee | null = null
  constructor() {

  }
}
