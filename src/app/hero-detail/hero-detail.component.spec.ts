import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { of } from 'rxjs/internal/observable/of';
import { FormsModule } from '@angular/forms';

describe('HeroDetailComponent', () => {
  // Important to give fixture a ComponentFixture<Type>
  // to enable intellisense..
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivatedRouteService, mockLocationService, mockHeroService;

  beforeEach(() => {
    // Example of hand writing a service mock
    // with nested functions..
    mockActivatedRouteService = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3';
          }
        }
      }
    };
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocationService = jasmine.createSpyObj(['back']);
    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      imports: [FormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRouteService },
        { provide: Location, useValue: mockLocationService },
        { provide: HeroService, useValue: mockHeroService }
      ]
    });
    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService.getHero.and.returnValue(of({ id: 7, name: 'MR ICE', strength: 9 }));
  });

  it('should render the Hero name in an H2 tag', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('MR ICE');
  });
});
