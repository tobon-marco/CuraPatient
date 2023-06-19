import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Employee, JwtWUser } from 'src/interfaces';

const USER_KEY = 'cura-patient';

const JWT : string = "-jwt"
const EMPLOYEE : string = "-employee"

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(validUserWToken: JwtWUser): void {
    window.sessionStorage.removeItem(USER_KEY + JWT);
    window.sessionStorage.removeItem(USER_KEY + EMPLOYEE);
    window.sessionStorage.setItem(USER_KEY + EMPLOYEE, JSON.stringify(validUserWToken.employee));
    window.sessionStorage.setItem(USER_KEY + JWT, validUserWToken.jwtToken);
  }

  public getUser(): Employee {
    const user = window.sessionStorage.getItem(USER_KEY + EMPLOYEE);
    if (user) {
      return JSON.parse(user);
    }

    return {
      employee_id: null,
      name: null,
      phone_number: null,
      supervisors: null 
    };
  }
  public getJwtToken(): string {
    const token = window.sessionStorage.getItem(USER_KEY + JWT);

    if (token)
    {
      return token;
    }
    return '';
  }


  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY + EMPLOYEE);
    if (user) {
      return true;
    }

    return false;
  }

  public isAdmin(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY + EMPLOYEE);
    if (user) {

      let emp: Employee = JSON.parse(user);
      return emp.employee_id === 1
    }

    return false;
  }


}
export function adminGuard(redirectTo: string): CanActivateFn {
  return () => {
    const storageService: StorageService = inject(StorageService);
    const router: Router = inject(Router)
    return storageService.isAdmin() || router.createUrlTree([redirectTo]);
  };
}

export function authenticatedGuard(redirectTo: string): CanActivateFn {
  return () => {
    const storageService: StorageService = inject(StorageService);
    const router: Router = inject(Router)
    return storageService.isLoggedIn() || router.createUrlTree([redirectTo]);
  };
}