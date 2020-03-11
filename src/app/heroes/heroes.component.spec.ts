import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs/internal/observable/of';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { ID: 1, NAME: 'SpiderSkan', strength: 8 },
      { ID: 1, NAME: 'Corona Woman', strength: 8 },
      { ID: 1, NAME: 'SuperDude', strength: 8 }
    ];

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHeroe', 'deleteHero']);

    component = new HeroesComponent(mockHeroService);
  });

  describe('delete', () => {
    it('should remove the given item from the heroes list', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      expect(component.heroes.length).toBe(2);
    });

    // interaction test
    it('should call deleteHero', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
      expect(component.heroes.length).toEqual(2);

    });
  });
});
