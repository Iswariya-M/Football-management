import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  role: string = '';

  constructor(private authService: AuthService,private router: Router) { }

  signup(): void {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: 'user'
    };
    this.authService.signup(userData).subscribe(
      response => {
        console.log('Signup successful:', response);
        alert('Successfully signed up');
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error signing up:', error);
        alert('Failed to signup');
        // Handle error or show error message
      }
    );
  }
}