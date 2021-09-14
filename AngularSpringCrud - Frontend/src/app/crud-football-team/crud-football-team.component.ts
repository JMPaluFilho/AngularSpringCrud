import { Component, OnInit } from '@angular/core';
import { FootballTeamService } from '../football-team-service.service';
import { FootballTeam } from '../football-team';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-crud-football-team',
  templateUrl: './crud-football-team.component.html',
  styleUrls: ['./crud-football-team.component.css']
})
export class CrudFootballTeamComponent implements OnInit {

  pageTitle!: String;
  errorMessage!: String;
  id!: number;
  teams!: FootballTeam[];
  crudForm!: FormGroup;
  editable = false;
  hasErrors = false;
  footballTeam: FootballTeam = new FootballTeam();

  constructor(private footballTeamService: FootballTeamService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { this.createForm(); }

  createForm() {
    this.crudForm = this.formBuilder.group({
      teamName: ['', [Validators.required, Validators.minLength(3)]],
      teamStadium: ['', [Validators.required, Validators.minLength(3)]],
      teamFoundation: ['', Validators.required],
      teamSupporters: ['', Validators.required],
    });
  }

  changeTeamName(evt: any) {
    this.errorMessage = '';
    this.hasErrors = false;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.hasErrors = false;
    this.getTeams();

    if (!this.id) {
      this.pageTitle = 'Create Football Team';
      this.editable = false;
    } else {
      this.pageTitle = 'Edit Football Team';
      this.editable = true;

      this.footballTeamService.getFootballTeamById(this.id).pipe(map((response) => {
        this.footballTeam = response;
      })).subscribe(data => {
        this.crudForm.setValue({teamName: this.footballTeam.teamName,
          teamStadium: this.footballTeam.teamStadium,
          teamFoundation: this.footballTeam.teamFoundation,
          teamSupporters: this.footballTeam.teamSupporters});
      });

    }
  }

  getTeams() {
    this.footballTeamService.getAllFootballTeams().subscribe(data => {
      this.teams = data;
    });
  }

  saveFootballTeam() {
    this.footballTeamService.createFootballTeam(this.footballTeam).subscribe(data => {
      this.goToTeamsList();
    },
      error => console.log(error));
  }

  goToTeamsList() {
    this.router.navigate(['/list'])
  }

  onEditSubmit() {
    this.footballTeamService.updateFootballTeam(this.id, this.footballTeam).subscribe(data => {
      this.goToTeamsList();
    },
      error => console.log(error));
  }

  onCreateSubmit() {
    if (!this.errorValidation()) {
      this.saveFootballTeam();
    } else {
      console.log(this.errorMessage);
    }

  }

  errorValidation() {
    this.teams.forEach(el => {
      if (el.teamName == this.footballTeam.teamName) {
        this.errorMessage = 'There is already a Team with this name!';
        this.hasErrors = true;
      }
    });

    return this.hasErrors;
  }

  onSubmit() {
    this.errorMessage = '';
    this.hasErrors = false;
    this.footballTeam.teamName = this.TeamName?.value;
    this.footballTeam.teamStadium = this.TeamStadium?.value;
    this.footballTeam.teamFoundation = this.TeamFoundation?.value;
    this.footballTeam.teamSupporters = this.TeamSupporters?.value;

    if (this.editable) {
      this.onEditSubmit();
    } else {
      this.onCreateSubmit();
    }
  }

  get TeamName() {
    return this.crudForm.get('teamName');
  }

  get TeamStadium() {
    return this.crudForm.get('teamStadium');
  }

  get TeamFoundation() {
    return this.crudForm.get('teamFoundation');
  }

  get TeamSupporters() {
    return this.crudForm.get('teamSupporters');
  }

}
