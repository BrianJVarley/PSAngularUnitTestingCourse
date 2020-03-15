# Pluralsight's Unit Testing in Angular Course

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).



# Things to consider when writing a test

Should you A) duplicate code within a test which makes it more readable. Or B) remove any duplication to improve maintainability of tests.

## DAMP vs DRY

>> DAMP (Descriptive And Meaningful Phrases) promotes the readability of the code.
To maintain code, you first need to understand the code. To understand it, you have to read it. Consider for a moment how much time you spend reading code. It's a lot. DAMP increases maintainability by reducing the time necessary to read and understand the code.

>> DRY (Don't repeat yourself) promotes the orthogonality of the code.
Removing duplication ensures that every concept in the system has a single authoritative representation in the code. A change to a single business concept results in a single change to the code. DRY increases maintainability by isolating change (risk) to only those parts of the system that must change.


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