import { Component, OnInit } from '@angular/core';
import { FootballTeamService } from '../football-team-service.service';
import { FootballTeam } from '../football-team';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-football-team-list',
  templateUrl: './football-team-list.component.html',
  styleUrls: ['./football-team-list.component.css']
})
export class FootballTeamListComponent implements OnInit {

  teams!: FootballTeam[];
  team: FootballTeam = new FootballTeam();

  constructor(private footballTeamService: FootballTeamService, 
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams() {
    this.footballTeamService.getAllFootballTeams().subscribe(data => {
      this.teams = data.sort((a, b) => a.teamSupporters - b.teamSupporters).reverse();
    });
  }

  deleteFootballTeam(id: number) {
    this.footballTeamService.deleteFootballTeam(id).subscribe(data => {
      this.getTeams();
    },
    error => console.log(error));
  }

  updateFootballTeam(id: number) {
    this.router.navigate(['update-team', id]);
  }

  viewFootballTeam(id: number, content: any) {
    this.footballTeamService.getFootballTeamById(id).subscribe(data => {
      this.team = data;
    },
    error => console.log(error));

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {});
  }

}
