import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private authService = inject(AuthService);
  private http = inject(HttpClient);

  private router = inject(Router);

  login() {
    var tempModel = new LoginRequest();
    tempModel.Username = 'admin';
    tempModel.Password = '123';
    this.http.post<any>(`${this.authService.baseUrl}/login`, tempModel).subscribe(res=>{
     
        this.authService.login(res.token); // store JWT
        this.router.navigate(['/']);
      
    })
    
  }
}


class LoginRequest {
  Username!: string;
  Password!: string;
}
