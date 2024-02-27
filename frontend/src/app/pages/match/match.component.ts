import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrl: './match.component.css'
})
export class MatchComponent implements OnInit {
  matches: any[] = [];

  constructor(private http: HttpClient,private location: Location) { }

  ngOnInit(): void {
    this.getMatches();
  }

  getMatches(): void {
    this.http.get<any>('http://localhost:3000/matches').subscribe(data => {
      console.log(data);
      this.matches = data;
    });
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