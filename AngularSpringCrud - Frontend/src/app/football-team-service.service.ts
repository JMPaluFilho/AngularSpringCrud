import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FootballTeam } from './football-team';

@Injectable({
  providedIn: 'root'
})
export class FootballTeamService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  createFootballTeam(footballTeam: FootballTeam): Observable<Object> {
    return this.http.post(`${this.baseUrl}/createTeam`, footballTeam);
  }

  deleteFootballTeam(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/deleteTeam/${id}`);
  }

  updateFootballTeam(id: number, team: FootballTeam): Observable<Object> {
    return this.http.put(`${this.baseUrl}/updateTeam/${id}`, team);
  }

  getPaginatedTeams(params: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/paginatedList`, { params });
  }

  getAllFootballTeams(): Observable<FootballTeam[]> {
    return this.http.get<FootballTeam[]>(`${this.baseUrl}/teamList`);
  }

  getFootballTeamById(id: number): Observable<FootballTeam> {
    return this.http.get<FootballTeam>(`${this.baseUrl}/team/${id}`);
  }

}
