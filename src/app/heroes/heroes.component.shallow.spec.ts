import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';

describe('HeroesComponent (shallow tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;
  const HEROES_INIT_SIZE = 3;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHeroes', 'deleteHeroes']);
    HEROES = [
      { ID: 1, NAME: 'SpiderSkan', strength: 8 },
      { ID: 1, NAME: 'Corona Woman', strength: 8 },
      { ID: 1, NAME: 'SuperDude', strength: 8 }
    ];
    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should set heroes returned from the service', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    expect(fixture.componentInstance.heroes.length).toBe(HEROES_INIT_SIZE);
  });
});
