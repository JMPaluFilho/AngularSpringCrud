import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudFootballTeamComponent } from './crud-football-team.component';

describe('AddFootballTeamComponent', () => {
  let component: CrudFootballTeamComponent;
  let fixture: ComponentFixture<CrudFootballTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudFootballTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudFootballTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
