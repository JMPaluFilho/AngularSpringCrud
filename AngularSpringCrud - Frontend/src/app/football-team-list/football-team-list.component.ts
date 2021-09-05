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
  headerTitle!: string;
  showArrow = false;
  isAsc = false;

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

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => { });
  }

  sortByHeader(header: string) {
    this.showArrow = true;
    this.headerTitle = header;
    this.isAsc = !this.isAsc;

    switch (header) {
      case 'name':
        if (this.isAsc) {
          this.teams = this.teams.sort((a, b) => a.teamName.localeCompare(b.teamName));
        }
        if (!this.isAsc) {
          this.teams = this.teams.sort((a, b) => a.teamName.localeCompare(b.teamName)).reverse();
        }
        break;
      case 'stadium':
        if (this.isAsc) {
          this.teams = this.teams.sort((a, b) => a.teamStadium.localeCompare(b.teamStadium));
        }
        if (!this.isAsc) {
          this.teams = this.teams.sort((a, b) => a.teamStadium.localeCompare(b.teamStadium)).reverse();
        }
        break;
      case 'foundation':
        if (this.isAsc) {
          this.teams = this.teams.sort((a, b) => a.teamFoundation.toString().localeCompare(b.teamFoundation.toString()));
        }
        if (!this.isAsc) {
          this.teams = this.teams.sort((a, b) => a.teamFoundation.toString().localeCompare(b.teamFoundation.toString())).reverse();
        }
        break;
      case 'supporters':
        if (this.isAsc) {
          this.teams = this.teams.sort((a, b) => a.teamSupporters - b.teamSupporters);
        }
        if (!this.isAsc) {
          this.teams = this.teams.sort((a, b) => a.teamSupporters - b.teamSupporters).reverse();
        }
        break;
      default: break;
    }
  }

}
