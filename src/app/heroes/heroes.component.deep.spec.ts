import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
// tslint:disable-next-line: import-blacklist
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeroesComponent (deep tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHeroes', 'deleteHeroes']);
    HEROES = [
      { ID: 1, NAME: 'SpiderSkan', strength: 8 },
      { ID: 1, NAME: 'Corona Woman', strength: 8 },
      { ID: 1, NAME: 'SuperDude', strength: 8 }
    ];
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  xit('should render each hero as a HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

    // Directive = Attribute Directives and Components
    // so we can find by ComponentName
    const heroComponentDebugElements = fixture.debugElement.queryAll(By.directive(HeroComponent));

    // Grab the component instance and check props
    for (let index = 0; index < heroComponentDebugElements.length; index++) {
      expect(heroComponentDebugElements[index].componentInstance.hero.name).toEqual(HEROES[index]);
    }
  });
});
