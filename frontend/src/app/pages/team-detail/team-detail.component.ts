import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrl: './team-detail.component.css'
})
export class TeamDetailComponent implements OnInit {
  teamId!: string;
  team: any = {};

  constructor(private route: ActivatedRoute, private http: HttpClient,private location: Location) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.teamId = params.get('id')!;
      this.fetchTeamDetails(this.teamId);
    });
  }

  fetchTeamDetails(id: string): void {
    
    this.http.get<any>('http://localhost:3000/team/' + id)
      .subscribe(
        response => {
          this.team = response;
        },
        error => {
          console.error('Error fetching team details:', error);
          
        }
      );
  }

  goBack(): void {
    this.location.back();
   }

}
