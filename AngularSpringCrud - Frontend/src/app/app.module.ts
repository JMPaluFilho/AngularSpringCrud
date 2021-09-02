import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CrudFootballTeamComponent } from './crud-football-team/crud-football-team.component';
import { FootballTeamListComponent } from './football-team-list/football-team-list.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    CrudFootballTeamComponent,
    FootballTeamListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxMaskModule.forRoot(maskConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
