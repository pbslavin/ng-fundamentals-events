import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventListResolver } from './event-list-resolver.service';
import { Event } from './shared/index';

@Component({
  template: `
    <div>
      <h1>Upcoming Angular Events</h1>
      <hr>
      <div class="row">
        <div *ngFor="let event of events" class="col-md-5">
          <app-event-thumbnail [event]="event"></app-event-thumbnail>
        </div>
      </div>
    </div>
  `
})
export class EventListComponent implements OnInit {
  events: Event[];
  constructor(private eventListResolver: EventListResolver, private route: ActivatedRoute ) {}

  ngOnInit() {
    // this.eventListResolver.resolve().subscribe(events => {
    //   this.events = events;
    // });
    this.events = this.route.snapshot.data['events'];
  }
}
