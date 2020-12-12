import { Component, Inject } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { EventService } from '../events/shared/event.service';
import { User } from '../user/user.model';
import { Session } from '../events/shared/event.model';

@Component({
    selector: 'nav-bar',
    templateUrl: './navbar.component.html',
    styles: [`
        .nav.navbar-nav { font-size: 15px; }
        #searchForm { margin-right: 100px }
        @media (max-width: 1200px) { #searchForm { display: none } }
        li > a.active { color: #F98935; }
    `]
})
export class NavBarComponent {
    searchTerm: string = "";
    foundSessions: Session[];

    constructor(private auth: AuthService, private eventService: EventService) {
    }

    searchSessions(searchTerm: string) {
        this.eventService.searchSessions(searchTerm).subscribe((sessions: Session[]) => {
            this.foundSessions = sessions;
            console.log(this.foundSessions);
        })
    }
}