import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { LogoutPageComponent } from './page/logout-page/logout-page.component';
import { EmployeeInfoComponent } from './page/employee-info/employee-info.component';
import { EmployeeListComponent } from './page/employee-list/employee-list.component';
import { LeftSideBarComponent } from './components/left-side-bar/left-side-bar.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { AgGridModule } from 'ag-grid-angular';
import { httpInterceptorProviders } from './utils/http.interceptor';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPageComponent,
    LogoutPageComponent,
    EmployeeInfoComponent,
    EmployeeListComponent,
    LeftSideBarComponent,
    UserCardComponent,
    EmployeeTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,


    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatInputModule,

    AgGridModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
