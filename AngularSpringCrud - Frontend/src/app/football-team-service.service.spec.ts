import { TestBed } from '@angular/core/testing';

import { FootballTeamService } from './football-team-service.service';

describe('FootballTeamServiceService', () => {
  let service: FootballTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FootballTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
