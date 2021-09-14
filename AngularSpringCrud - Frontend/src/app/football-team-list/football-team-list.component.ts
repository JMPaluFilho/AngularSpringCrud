import { Component, OnInit } from '@angular/core';
import { FootballTeamService } from '../football-team-service.service';
import { FootballTeam } from '../football-team';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageEvent } from '@angular/material/paginator';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-football-team-list',
  templateUrl: './football-team-list.component.html',
  styleUrls: ['./football-team-list.component.css']
})
export class FootballTeamListComponent implements OnInit {

  teams!: FootballTeam[];
  selectedTeams!: FootballTeam[];
  team: FootballTeam = new FootballTeam();
  headerTitle!: string;
  masterSelected = false;
  isDeleteSelected = false;
  showArrow = false;
  isAsc = false;
  showError = false;
  errorMessage = '';
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
    this.showError = false;
    this.errorMessage = '';
    this.masterSelected = false;

    this.footballTeamService.getPaginatedTeams(params).pipe(map((response) => {
      this.teams = response.content.sort((a: any, b: any) => a.teamSupporters - b.teamSupporters).reverse();
      this.teams.forEach(element => {
        element.selected = false;
      });
      this.count = response.totalElements;
    })).subscribe(data => {
      this.getCheckedItemList();
    },
      error => console.log(error)
    );
  }

  getCheckedItemList() {
    this.selectedTeams = [];
    for (var i = 0; i < this.teams.length; i++) {
      if (this.teams[i].selected) {
        this.selectedTeams.push(this.teams[i]);
      }
    }
  }

  checkUncheckAll() {
    for (var i = 0; i < this.teams.length; i++) {
      this.teams[i].selected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.masterSelected = this.teams.every(function (item: any) {
      return item.selected == true;
    })
    this.getCheckedItemList();
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

  searchByName() {
    this.footballTeamService.getFootballTeamByName(this.searchTeam).subscribe(data => {
      console.log(data);
      this.teams = [];
      this.teams.push(data);
      this.showError = false;
      this.errorMessage = '';
    },
      error => {
        console.log(error);
        this.showError = true;
        this.errorMessage = 'Football Team not exist with name: ' + this.searchTeam;
      }
    );
  }

  clearSearch() {
    this.searchTeam = '';
    this.getPaginatedTeams();
  }

  deleteSelected(content: any) {
    let index = 0;
    this.isDeleteSelected = true;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result == "delete") {
        this.selectedTeams.forEach(element => {
          this.footballTeamService.deleteFootballTeam(element.teamId).pipe(map((response) => {
            index++;
          })).subscribe(data => {
            if (index == this.selectedTeams.length) {
              this.getPaginatedTeams();
            }
          },
            error => console.log(error));
        });
      }
    });
  }

  deleteFootballTeam(id: number, content: any) {
    this.isDeleteSelected = false;
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
    this.router.navigate(['update', id]);
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
