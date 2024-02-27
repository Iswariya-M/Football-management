import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // email: string = '';
  // password: string = '';
  // errorMessage: string = '';

  // constructor(private authService: AuthService, private router: Router) { }

  // login(): void {
  //   const userData = {
  //     email: this.email,
  //     password: this.password
  //   };
  //   this.authService.login(userData).subscribe(
  //     response => {
  //       console.log('Login response:', response); // Log the response
  //       if (response === 'User logged in successfully') {
  //         alert('Login successful');
  //         // Redirect to home page for user
  //         this.router.navigate(['/home']);
  //       } else if (response === 'Admin logged in successfully') {
  //         alert('Admin login successful');
  //         // Redirect to admin page for admin
  //         this.router.navigate(['/admin']);
  //       } else {
  //         alert('No user found');
  //       }
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.error('Error logging in:', error);
  //       // Log the error details
  //       console.log('Error status:', error.status);
  //       console.log('Error message:', error.message);
  //       console.log('Error body:', error.error);
  //       // Handle error or show error message
  //       alert('Error logging in. Please try again.');
  //     }
      
  //   );
  // }

//   login(): void {
//     const userData = {
//       email: this.email,
//       password: this.password
//     };
//     this.authService.login(userData).subscribe(
//       (response: any) => {
//         console.log('Login response:', response);
//         if (response === 'User logged in successfully' || response === 'Admin logged in successfully') {
//           alert('Login successful');
//           if (response === 'Admin logged in successfully') {
//             this.router.navigate(['/admin']);
//           } else {
//             this.router.navigate(['/home']);
//           }
//         } else {
//           this.errorMessage = 'No user found';
//         }
//       },
//       (error: HttpErrorResponse) => {
//         console.error('Error logging in:', error);
//         if (error.status === 404) {
//           // Check if the error message is provided in the response body
//           this.errorMessage = error.error.message || 'Unknown error occurred';
//         } else {
//           this.errorMessage = 'Error logging in. Please try again.';
//         }
//       }
//     );
//   }
// }  

email: string = '';
  password: string = '';
  message: string = '';

//   constructor(private http: HttpClient) {}

//   login() {
//     const formData = { email: this.email, password: this.password };
//     this.http.post<any>('http://localhost:3000/login', formData).subscribe(
//       (response) => {
//         if (response.message === 'Admin logged in successfully' || response.message === 'User logged in successfully') {
//           this.message = response.message;
//         } else {
//           this.message = 'Login failed: ' + response.message;
//         }
//       },
//       (error) => {
//         this.message = 'An error occurred: ' + error.message;
//       }
//     );
//   }
// }

constructor(private http: HttpClient, private router: Router) {}

  login() {
    const formData = { email: this.email, password: this.password };
    this.http.post<any>('http://localhost:3000/login', formData).subscribe(
      (response) => {
        if (response.message === 'Admin logged in successfully') {
          alert("Amin Login Success");
          this.router.navigate(['/admin']);
        } else if (response.message === 'User logged in successfully') {
          alert("Login success");
          this.router.navigate(['/home']);
        } else {
          alert("User not found")
        }
      },
      (error) => {
       alert("login failed");
      }
    );
  }
}