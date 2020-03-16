import { TestBed, inject } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MessageService } from './message.service';

describe('HeroService', () => {
  const HERO_API_URL = 'api/heroes';
  let mockMessageService: MessageService;
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService, { provide: MessageService, useValue: mockMessageService }]
    });
    // TestBed.get looks inside DI injection registry
    // for handle on registered services..
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(HeroService);
  });

  describe('getHero', () => {
    // Example testing HTTP service and
    // subscribing to promise response
    it('should call .get with the correct API URL', () => {
      // Call Service method
      service.getHero(4).subscribe();

      // Set expected request URL to be called
      const expectedRequest = httpTestingController.expectOne(`${HERO_API_URL}/4`);

      // Verify correct Hero Object returned for given ID
      expectedRequest.flush({ ID: 1, NAME: 'SuperDude', strength: 8 });

      // Verify that there are no subsequent requests
      // fired after initial 'getHero' call
      httpTestingController.verify();
    });
  });
});
