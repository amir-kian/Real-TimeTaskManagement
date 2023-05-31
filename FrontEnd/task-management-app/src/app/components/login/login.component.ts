import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private http: HttpClient,private router: Router,
    ) {}

    login() {
      debugger;
      this.http.post<any>(`${environment.apiUrl}/api/Auth/login`, { username: this.username, password: this.password })
        .subscribe(
          response => {
            // Authentication successful
            localStorage.setItem('token', response.token);
            this.router.navigate(['/']);
          },
          error => {
            // Authentication failed
            if (error.status === 401) {
              alert('Invalid username or password');
            } else {
              alert('An error occurred while trying to log in');
            }
          }
        );
    }
  GoBackToList() {
    this.router.navigate(['/list']);
  }
}
