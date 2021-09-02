import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballTeamListComponent } from './football-team-list.component';

describe('FootballTeamListComponent', () => {
  let component: FootballTeamListComponent;
  let fixture: ComponentFixture<FootballTeamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FootballTeamListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballTeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
