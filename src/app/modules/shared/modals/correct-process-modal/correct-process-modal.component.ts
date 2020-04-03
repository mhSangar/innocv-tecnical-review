import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-correct-process-modal",
  template: `
    <div *transloco="let t; read 'correctProcessModal.' + process ">
      <div class="modal-header">
      <h4 class="modal-title">{{ t('title') }} 🤗</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{ t('description', { id: id, name: name, date: date }) }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" ngbAutofocus (click)="activeModal.close('Close click')">{{ t('closeBtn') }}</button>
    </div>
    </div>
    
  `,
  styleUrls: ["./correct-process-modal.component.scss"]
})
export class CorrectProcessModalComponent implements OnInit {
  id: number;
  name: string;
  date: string;
  process: string;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  onClose(): void {
    this.activeModal.close("closed");
  }

  onDismiss(reason: String): void {
    this.activeModal.dismiss(reason);
  }
}
