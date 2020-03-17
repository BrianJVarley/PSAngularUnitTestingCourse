import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
// tslint:disable-next-line: import-blacklist
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';

describe('HeroesComponent (deep tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHeroes']);
    HEROES = [
      { id: 1, name: 'SpiderSkan', strength: 8 },
      { id: 1, name: 'Corona Woman', strength: 8 },
      { id: 1, name: 'SuperDude', strength: 8 }
    ];
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      //schemas: [NO_ERRORS_SCHEMA]
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

  // Option 1 - Raise events from child component to parent
  it('should call HeroService.deleteHero when the child HeroComponent delete binding clicked', () => {
    // Spy on component's delete function call
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // Trigger ngOnInit
    fixture.detectChanges();

    // Trigger the child component's click handler
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    heroComponents[0].query(By.css('button')).triggerEventHandler('click', { stopPropagation: () => {} });

    // Assert that correct Hero Item is passed to click handler
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  // Option 2 - Emit event from child component to parent, check bindings
  it('should call HeroService.deleteHero when the child HeroComponent delete binding clicked', () => {
    // Spy on component's delete function call
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // Trigger ngOnInit
    fixture.detectChanges();

    // Emit the child component's click event
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

    // Assert that correct Hero Item is passed to click handler
    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it('should add new Hero to hero list when add button clicked', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const newHeroName = 'MR ICE';
    mockHeroService.addHero.and.returnValue(of({ id: 5, name: newHeroName, strength: 9 }));

    // Populate input box by getting handle on 'input' element
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

    inputElement.value = newHeroName;
    addButton.triggerEventHandler('click', null);
    // Update bindings after event handler trigger
    fixture.detectChanges();

    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(heroText).toContain(newHeroName);
  });
});
