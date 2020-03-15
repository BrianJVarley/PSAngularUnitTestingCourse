import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { NO_ERRORS_SCHEMA, Input, Component } from '@angular/core';
import { HeroService } from '../hero.service';
// tslint:disable-next-line: import-blacklist
import { of } from 'rxjs';
import { Hero } from '../hero';

describe('HeroesComponent (shallow tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;
  const HEROES_INIT_SIZE = 3;

  // Example of mocking the child 'app-hero' component
  // Alternative to using risky NO_ERRORS_SCHEMA
  @Component({
    selector: 'app-hero',
    template: '<div></div>'
  })
  class MockHeroComponent {
    @Input() hero: Hero;
  }

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHeroes', 'deleteHeroes']);
    HEROES = [
      { ID: 1, NAME: 'SpiderSkan', strength: 8 },
      { ID: 1, NAME: 'Corona Woman', strength: 8 },
      { ID: 1, NAME: 'SuperDude', strength: 8 }
    ];
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, MockHeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }]
      // NO_ERRORS_SCHEMA can hide problems in template markup
      // schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should set heroes returned from the service', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    expect(fixture.componentInstance.heroes.length).toBe(HEROES_INIT_SIZE);
  });
});
