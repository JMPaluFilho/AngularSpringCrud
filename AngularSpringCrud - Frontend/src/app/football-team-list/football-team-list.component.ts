import { Component, OnInit } from '@angular/core';
import { FootballTeamService } from '../football-team-service.service';
import { FootballTeam } from '../football-team';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageEvent } from '@angular/material/paginator';

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
  searchTeam = '';
  page = 0;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private footballTeamService: FootballTeamService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getPaginatedTeams();
  }

  getPaginatedTeams() {
    const params = this.getRequestParams(this.searchTeam, this.page, this.pageSize);

    this.footballTeamService.getPaginatedTeams(params).subscribe(data => {
      this.teams = data.content.sort((a: any, b: any) => a.teamSupporters - b.teamSupporters).reverse();
      this.count = data.totalElements;
    });
  }

  nextPage(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getPaginatedTeams();
  }

  getRequestParams(searchTeam: any, page: any, pageSize: any) {
    let params: { [key: string]: any } = {};

    if (searchTeam) {
      params[`searchTeam`] = searchTeam;
    }

    if (page) {
      params[`page`] = page;
    } else {
      params[`page`] = 0;
    }

    if (pageSize) {
      params[`pageSize`] = pageSize;
    } else {
      params[`pageSize`] = 3;
    }

    return params;
  }

  handlePageChange(event: any) {
    this.page = event;
    this.getPaginatedTeams();
  }

  handlePageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getPaginatedTeams();
  }

  deleteFootballTeam(id: number, content: any) {
    this.footballTeamService.getFootballTeamById(id).subscribe(data => {
      this.team = data;
    },
      error => console.log(error)
    );

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result == "delete") {
        this.footballTeamService.deleteFootballTeam(id).subscribe(data => {
          this.getPaginatedTeams();
        },
          error => console.log(error));
      }
    });
  }

  updateFootballTeam(id: number) {
    this.router.navigate(['update-team', id]);
  }

  viewFootballTeam(id: number, content: any) {
    this.footballTeamService.getFootballTeamById(id).subscribe(data => {
      this.team = data;
    },
      error => console.log(error)
    );

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
