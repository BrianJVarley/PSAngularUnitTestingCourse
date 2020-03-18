# Pluralsight's Unit Testing in Angular Course

# Overview:

Example of different Angular tests covered in a Pluralsight course on Angular Unit Testing.

I've added examples of the following Component .spec files..

- Isolated Unit Tests (Component only)
- Shallow Integration Tests (Component and Mock Child, DI Services)
- Deep Integration Tests (Component and Actual Child, Service Integration Tests)
- Testing DOM Interaction & Routing (Testing click or input bindings, mocking router link)

# Things to consider when writing a test

Should you A) duplicate code within a test which makes it more readable. Or B) remove any duplication to improve maintainability of tests.

## DAMP vs DRY

> > DAMP (Descriptive And Meaningful Phrases) promotes the readability of the code.
> > To maintain code, you first need to understand the code. To understand it, you have to read it. Consider for a moment how much time you spend reading code. It's a lot. DAMP increases maintainability by reducing the time necessary to read and understand the code.

> > DRY (Don't repeat yourself) promotes the orthogonality of the code.
> > Removing duplication ensures that every concept in the system has a single authoritative representation in the code. A change to a single business concept results in a single change to the code. DRY increases maintainability by isolating change (risk) to only those parts of the system that must change.

## Mocking Child Components

Instead of using `NO_ERRORS_SCHEMA` to ignore unknown child element tags.
You can mock the child component directly in the test.

`NO_ERRORS_SCHEMA` can be bad as tests won't error when the component
template has actual markup errors..

```JavaScript

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

```

## Testing Async Code / Promises

Example using ComponentFixture.whenStable to test async code
> This can be used to resume testing after events have triggered asynchronous activity or asynchronous change detection.


```JavaScript
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

```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
