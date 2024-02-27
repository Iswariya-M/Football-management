import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  showTeamForm: boolean = false;
  showMatchForm: boolean = false;
  teamName: string = '';
  teamCaption: string = '';
  player1: string = '';
  player2: string = '';
  player3: string = '';
  player4: string = '';
  player5: string = '';
  player6: string = '';
  player7: string = '';
  player8: string = '';
  player9: string = '';
  player10: string = '';
  imageUrl: string = '';

  team1: string = '';
  team2: string = '';
  date: string = '';
  teams: any[] = [];
  matches: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getTeams();
    this.getMatches();
  }

  toggleTeamForm(): void {
    this.showTeamForm = !this.showTeamForm;
  }

  toggleMatchForm(): void {
    this.showMatchForm = !this.showMatchForm;
  }
  onSubmit() { 
    const teamData = {
      teamName: this.teamName,
      teamCaption: this.teamCaption,
      player1: this.player1,
      player2: this.player2,
      player3: this.player3,
      player4: this.player4,
      player5: this.player5,
      player6: this.player6,
      player7: this.player7,
      player8: this.player8,
      player9: this.player9,
      player10: this.player10,
      imageUrl: this.imageUrl
    };
  //   this.http.post<any>('http://localhost:3000/',teamData ).subscribe(data => {
  //     console.log(data);
  //     alert("Successfully booked");
  //   });
  // }
    
    this.http.post<any>('http://localhost:3000/teams', teamData)
      .subscribe(
        data => {
          console.log('data');
          alert("Team added successfully");
          this.clearTeamForm();
          this.getTeams();
          
        },
        error => {
          console.error('Error submitting team data:', error);
          alert('Failed to add');
          
        }
      );
  }

  
  addMatch(): void {
    const matchData = {
      team1: this.team1,
      team2: this.team2,
      date: this.date
    };
    this.http.post<any>('http://localhost:3000/addMatch', matchData).subscribe(
      data => {
        console.log(data);
        alert("Match added successfully");
        this.clearMatchForm();
        this.getMatches(); // Refresh the matches data
      },
      error => {
        console.error('Error adding match:', error);
        alert('Failed to add match. Please try again.');
      }
    );
  }
  
  clearMatchForm(): void {
    this.team1 = '';
    this.team2 = '';
    this.date = '';
  }

  clearTeamForm():void{
    this.teamName='';
    this.teamCaption='';
    this.player1='';
    this.player2='';
    this.player3= '';
    this.player4='';
    this.player5='';
    this.player6='';
    this.player7='';
    this.player8='';
    this.player9='';
    this.player10='';

  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
  }
  
  
  getTeams(): void {
    this.http.get<any>('http://localhost:3000/teams').subscribe(data => {
      console.log(data);
      this.teams = data;
    });
  }

  getMatches(): void {
    this.http.get<any>('http://localhost:3000/matches').subscribe(data => {
      console.log(data);
      this.matches = data;
    });
  }
}
