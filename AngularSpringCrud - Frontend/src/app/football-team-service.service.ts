import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FootballTeam } from './football-team';

@Injectable({
  providedIn: 'root'
})
export class FootballTeamService {

  private baseUrl = 'http://localhost:8080/api/teams';

  constructor(private http: HttpClient) { }

  createFootballTeam(footballTeam: FootballTeam): Observable<Object> {
    return this.http.post(`${this.baseUrl}/create`, footballTeam);
  }

  deleteFootballTeam(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  updateFootballTeam(id: number, team: FootballTeam): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update/${id}`, team);
  }

  getPaginatedTeams(params: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/list`, { params });
  }

  getAllFootballTeams(): Observable<FootballTeam[]> {
    return this.http.get<FootballTeam[]>(`${this.baseUrl}/list`);
  }

  getFootballTeamById(id: number): Observable<FootballTeam> {
    return this.http.get<FootballTeam>(`${this.baseUrl}/${id}`);
  }

  getFootballTeamByName(name: any): Observable<FootballTeam> {
    return this.http.get<FootballTeam>(`${this.baseUrl}/search/${name}`);
  }

}
