import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user/user';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  user: User = {
    id: 0,
    fullName: '',
    email: '',
    addres: '',
    role: '',
    isEmployee: false
  };

  constructor(
    private router: Router,
    public authService: AuthService
  ) {
    if (this.authService.isLoggedIn) {
      this.authService.getAuthUser()
        .subscribe(result => {
          this.user = result;
        });
    }
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/sign-in']);
  }
}
