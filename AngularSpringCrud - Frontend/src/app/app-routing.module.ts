import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudFootballTeamComponent } from './crud-football-team/crud-football-team.component';
import { FootballTeamListComponent } from './football-team-list/football-team-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: FootballTeamListComponent },
  { path: 'create', component: CrudFootballTeamComponent },
  { path: 'update/:id', component: CrudFootballTeamComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
