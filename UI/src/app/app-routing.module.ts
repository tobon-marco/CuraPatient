import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { EmployeeInfoComponent } from './page/employee-info/employee-info.component';
import { EmployeeListComponent } from './page/employee-list/employee-list.component';
import { LogoutPageComponent } from './page/logout-page/logout-page.component';
import { adminGuard, authenticatedGuard } from './services/storage.service';
import { EmployeeCreateComponent } from './page/employee-create/employee-create.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'logout', component: LogoutPageComponent },
  {
    path: 'employee', canActivate: [authenticatedGuard('/login')],
    children: [
      { path: '', redirectTo: 'myinfo', pathMatch: 'full'},
      { path: 'myinfo', component: EmployeeInfoComponent, canActivate: [authenticatedGuard('/login')] },
      { path: 'list', component: EmployeeListComponent, canActivate: [adminGuard('employee/myinfo')]},
      { path: 'create', component: EmployeeCreateComponent, canActivate: [adminGuard('employee/myinfo')]},
      // { path: ':employeeId', component: EmployeeInfoComponent, canActivate: [adminGuard('employee/myinfo')]},
      { path: '**', component: EmployeeInfoComponent, canActivate: [authenticatedGuard('/login')] }
    ]
  },
  { path: '', redirectTo: 'employee/myinfo', pathMatch: 'full' },
  { path: '**', redirectTo: 'myinfo' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
