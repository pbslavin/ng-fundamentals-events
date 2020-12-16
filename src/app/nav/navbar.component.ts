import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { Event } from '../events/shared/event.model';
import { EventService } from '../events/shared/event.service';
import { User } from '../user/user.model';
import { Session } from '../events/shared/event.model';
import { Observable } from 'rxjs';
import { EventListResolver } from '../events';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styles: [`
        .nav.navbar-nav { font-size: 15px; }
        #searchForm { margin-right: 100px }
        @media (max-width: 1200px) { #searchForm { display: none } }
        li > a.active { color: #F98935; }
    `]
})
export class NavBarComponent implements OnInit {
    searchTerm = '';
    foundSessions: Session[];
    events: Event[];
    auth: AuthService;

    constructor(auth: AuthService, private eventService: EventService, private route: ActivatedRoute) {
        this.auth = auth;
    }

    ngOnInit() {
        this.eventService.getEvents().subscribe(events => {
            this.events = events;
        });
    }

    searchSessions(searchTerm: string) {
        this.eventService.searchSessions(searchTerm).subscribe((sessions: Session[]) => {
            this.foundSessions = sessions;
            console.log(this.foundSessions);
        });
    }
}
