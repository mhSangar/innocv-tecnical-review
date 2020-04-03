import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-error-modal",
  template: `
    <div *transloco="let t; read 'errorModal'">
      <div class="modal-header">
      <h4 class="modal-title">{{ status }}{{ t('title') }} 😥</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{ t('description') }}</p>
      <div class="form-group error-details">
        <label for="errorMessage">{{ t('errorDetails') }}: </label>
        <textarea class="form-control" id="errorMessage" rows="3" disabled>{{ message }}</textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" ngbAutofocus (click)="activeModal.close('Close click')">{{ t('closeBtn') }}</button>
    </div>
    </div>    
  `,
  styleUrls: ["./error-modal.component.scss"]
})
export class ErrorModalComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  onClose(): void {
    this.activeModal.close("closed");
  }

  onDismiss(reason: String): void {
    this.activeModal.dismiss(reason);
  }
}
