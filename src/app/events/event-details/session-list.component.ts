import { Component, Input, OnChanges } from "@angular/core";
import { AuthService } from '../../user/auth.service';
import { VoterService } from './voter.service';
import { Session } from "../shared";

@Component({
  selector: "session-list",
  templateUrl: "./session-list.component.html",
})
export class SessionListComponent implements OnChanges {
  @Input() sessions: Session[];
  @Input() filterBy: string;
  @Input() sortBy: string;
  @Input() eventId: number;
  visibleSessions: Session[] = [];

  constructor(private auth: AuthService, private voterService: VoterService ) {
    console.log('new SessionListComponent');
  }

  ngOnChanges() {
    console.log('ngOnChanges');
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortBy === 'name' 
        ? this.visibleSessions.sort(sortByNameAsc)
        : this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  toggleVote(session: Session) {
    if (this.userHasVoted(session)) {
     this.voterService.deleteVoter(this.eventId, session, this.auth.currentUser.userName);
    } else {
      this.voterService.addVoter(this.eventId, session, this.auth.currentUser.userName);
    };
    if (this.sortBy === 'votes') {
      this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  userHasVoted(session: Session) {
    return this.voterService.userHasVoted(this.eventId, session, this.auth.currentUser.userName);
  }

  filterSessions(filter) {
    if (filter === 'all') {
      this.visibleSessions = this.sessions.slice(0);
    } else {
      this.visibleSessions = this.sessions.filter(session => {
        return session.level.toLocaleLowerCase() === filter;
      });
    }
  }
}

function sortByNameAsc(s1: Session, s2: Session) {
  if (s1.name > s2.name) {
    return 1;
  } else if (s1.name === s2.name) {
    return 0;
  } else {
    return -1;
  }
}

function sortByVotesDesc(s1: Session, s2: Session) {
  return s2.voters.length - s1.voters.length;
}