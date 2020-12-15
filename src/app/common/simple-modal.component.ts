import { Component, ElementRef, Input, ViewChild, Inject } from '@angular/core';
import { JQ_TOKEN} from './j-query.service';

@Component({
    selector: 'app-simple-modal',
    template: `
    <div id="{{elementId}}" #modalcontainer class="modal fade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
            <h4 class="modal-title">{{title}}</h4>
          </div>
          <div class="modal-body" (click)="closeModal()">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </div>
    `,
    styles: [`
        .modal-header { margin-top: 60px; }
        .modal-body { height: 250px; overflow-y: scroll; }
        .modal { opacity: 50; }
    `]
})
export class SimpleModalComponent {
    @Input() title: string;
    @Input() elementId: string;
    @ViewChild('modalcontainer') containerEl: ElementRef;

    constructor(@Inject(JQ_TOKEN) private $: any) {}

    closeModal() {
        this.$(this.containerEl.nativeElement).modal('hide');
    }
}
