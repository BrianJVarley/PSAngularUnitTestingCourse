import { TestBed, ComponentFixture, fakeAsync, flush } from '@angular/core/testing';
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

  // Example of an async to sync test using Angular's
  // 'fakeAsync' and 'flush'
  // it('should call heroService.updateHero when save is called', fakeAsync(() => {
  //   mockHeroService.updateHero.and.returnValue(of({}));

  //   fixture.detectChanges();

  //   fixture.componentInstance.save();
  //   // look for any waiting tasks, i.e the .debounce function
  //   // wrapped around this .save function
  //   flush();

  //   expect(mockHeroService.updateHero).toHaveBeenCalled();
  // }));

  // Example of testing async promises using Angular's
  // 'async' function and 'fixture.whenStable' callback
  // to wait for async promises to resolve before running the 'expect'
  it('should call updateHero when save is called', async () => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.save();

    // fixture.whenStable() callback fires when all promises
    // within the component have been resolve. In this casr the promise
    // from mockHeroService.updateHero async call..
    fixture.whenStable().then(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled();
    });
  });
});
