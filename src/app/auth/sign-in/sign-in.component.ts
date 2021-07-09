import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/models/auth/login';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  error: any;
  errors: any = {
    Email: '',
    Password: ''
  };
  login: Login = {
    email: 'employee1@gmail.com',
    password: 'employee1'
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    if (authService.isLoggedIn) {
      this.router.navigate(['/products']);
    }
  }

  ngOnInit(): void {
  }
  
  onSubmit() {
    this.authService.login(this.login).subscribe(
      (res: any) => {
        this.router.navigate(['/products']);
      },
      (error) => {
        console.log(error.error);
        this.error = error.error;
        this.errors = error.error.errors;
      });
  }
}
