import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-upvote',
    template: `
        <div class="votingWidgetContainer pointable" (click)="onClick()">
            <div class="well votingWidget">
                <div class="votingButton">
                    <i class="glyphicon glyphicon-heart"
                    [style.color]="iconColor"></i>
                </div>
                <div class="badge badge-inverse votingCount">
                    <div>{{count}}</div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./upvote.component.css']
})
export class UpvoteComponent {
    @Input() count: number;
    @Input() set voted(val: boolean) {
        this.iconColor = val ? 'red' : 'white';
    }
    iconColor: string;
    @Output() vote = new EventEmitter();


    onClick() {
        this.vote.emit({});
    }
}
