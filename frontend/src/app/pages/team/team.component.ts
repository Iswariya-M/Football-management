import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements OnInit {
  teams: any[] = [];

  constructor(private http: HttpClient, private router: Router,private location: Location) { }

  ngOnInit(): void {
    // Fetch all teams from the server
    this.http.get<any[]>('http://localhost:3000/teams')
      .subscribe(
        response => {
          this.teams = response;
        },
        error => {
          console.error('Error fetching teams:', error);
          // Handle error message
        }
      );
  }

  navigateToTeamDetails(team: any): void {
    // Navigate to team details page with team id as parameter
    this.router.navigate(['/team-details', team.id]);
  }
  goToTeam(teamId: number): void {
    this.router.navigate(['/team', teamId]);
  }

  goBack(): void {
    this.location.back();
   }
   
}

