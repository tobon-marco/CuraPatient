import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'UI';


  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  name : string | null = null;


  constructor(private storageService: StorageService, private authService: AuthService)
  {}
  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn)
    {
      const user = this.storageService.getUser();
      this.name = user.name
    }
  }
}
