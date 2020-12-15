import { SessionListComponent } from './app-session-list.component';
import { Session } from '../shared/event.model';

describe('SessionListComponent', () => {
  let component: SessionListComponent;
  const mockAuthService = null;
  const mockVoterService = null;

  beforeEach(() => {
    component = new SessionListComponent(mockAuthService, mockVoterService);
  });

  describe('ngOnChanges', () => {
    it('should filter the sessions correctly', () => {
      component.sessions = <Session[]>[
        { name: 'session 1', level: 'intermediate' },
        { name: 'session 2', level: 'intermediate' },
        { name: 'session 3', level: 'beginner' },
      ];
      component.filterBy = 'intermediate';
      component.sortBy = 'name';
      component.eventId = 3;

      component.ngOnChanges();
      // expect(component.visibleSessions.length).toBe(2);
      expect(JSON.stringify(component.visibleSessions)).toEqual(
        JSON.stringify([
          { name: 'session 1', level: 'intermediate' },
          { name: 'session 2', level: 'intermediate' },
        ])
      );
    });

    it('should sort the sessions correctly', () => {
      component.sessions = <Session[]>[
        { name: 'session 2', level: 'intermediate' },
        { name: 'session 3', level: 'intermediate' },
        { name: 'session 1', level: 'beginner' },
      ];
      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 3;

      component.ngOnChanges();
      expect(component.visibleSessions[0].name).toBe('session 1');
    });
  });
});
