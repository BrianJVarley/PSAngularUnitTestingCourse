import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { AppRoutingModule } from '../app-routing.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Hero Component (shallow tests)', () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      // Careful with NO_ERRORS_SCHEMA as
      // test won't error when template has
      // invalid HTML or ngModel
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroComponent);
  });

  it('should have the correct Hero item', () => {
    fixture.componentInstance.hero = { id: 1, name: 'SuperSkan', strength: 3 };

    expect(fixture.componentInstance.hero.name).toEqual('SuperSkan');
  });

  it('should render the hero name inside anchor tag', () => {
    fixture.componentInstance.hero = { id: 1, name: 'SuperSkan', strength: 3 };
    // trigger change detection to update bindings on component
    fixture.detectChanges();

    // 'fixture.debugElement' gives us access to component DOM
    // + exposes extra props like, componentInstance which can tell us
    // what component the element belongs to..
    const debugEl = fixture.debugElement.query(By.css('a'));
    expect(debugEl.nativeElement.textContent).toContain('SuperSkan');

    // 'fixture.nativeElement' gives us access to component DOM
    // expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperSkan');
  });
});
