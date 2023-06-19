import { Component, OnInit } from '@angular/core';

import { LoginForm } from '../../../interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: LoginForm = {
    username: '',
    password: ''
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService, 
    private storageService: StorageService, 
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(this.form).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['/employee'])
      },
      error: err => {
        // this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

    reloadPage(): void {
      window.location.reload();
    }
  }
