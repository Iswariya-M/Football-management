import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit {
  name!: string;
  email!: string;
  mobile!: string;
  match: string = '';
  matches: any[] = [];
  showMatchDetails: boolean = false;
  
  

  constructor(private http: HttpClient, private router: Router,private location: Location) { }
  ngOnInit(): void {
    // Fetch matches data from the server upon component initialization
    this.fetchMatches();
  }

  bookMatch() {
    const bookData = {
      name: this.name,
      email: this.email,
      mobile: this.mobile,
      match: this.match
    };
    this.http.post<any>('http://localhost:3000/book', bookData)
      .subscribe(
        response => {
          alert('Booking successful!');
          this.router.navigate(['/success'], { state: { formData: bookData} });
          this.clearFormData();
          
        },
        error => {
          alert('Cannot book. Please try again later.');
        }
      );
  }

  fetchMatches(): void {
    // Fetch matches data from the server
    this.http.get<any>('http://localhost:3000/matches')
      .subscribe(
        data => {
          console.log('Matches data fetched successfully:', data);
          // Assign matches data to the matches array
          this.matches = data;
        },
        error => {
          console.error('Error fetching matches data:', error);
        }
      );
  }

      clearFormData(): void {
        // Reset form fields to empty strings or default values
        this.name = '';
        this.email = '';
        this.mobile = '';
        this.match = '';
      }
      toggleMatchDetails(): void {
        this.showMatchDetails = !this.showMatchDetails; // Toggle the flag
      }

      formatDate(dateString: string): string {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
      }

      goBack(): void {
        this.location.back();
       }
  }
