import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-confirm-modal',
  template: `
    <div class="modal-header bg-secondary text-white">
      <h4 class="modal-title">Test Silme</h4>
      <button type="button" class="btn-close btn-close-white" aria-label="Close" (click)="dismiss()"></button>
    </div>
    <div class="modal-body text-center">
      <p class="lead mb-4">Bu test kaydını silmek istediğinize emin misiniz?</p>
      <p class="fw-bold text-danger">Bu işlem geri alınamaz!</p>
    </div>
    <div class="modal-footer">
     <button type="button" class="btn btn-danger flex-grow-1" (click)="confirm()" [disabled]="isDeleting">
        <span *ngIf="isDeleting" class="spinner-border spinner-border-sm me-2"></span>
        Sil
      </button>
      <button type="button" class="btn btn-secondary flex-grow-1" (click)="dismiss()">İptal</button>
     
    </div>
   
  `
})
export class DeleteConfirmModalComponent {
  isDeleting = false;

  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.isDeleting = true;
    this.activeModal.close('confirmed');
  }

  dismiss() {
    this.activeModal.dismiss('cancelled');
  }
}