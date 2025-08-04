// popup.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class StatusPopupComponent implements OnInit {
  API_BASE = 'http://localhost:3000';
  @Input() id!: number;
  @Input() status!: string;

  // Mesaj bildirimleri için
  showMessage = false;
  messageText = '';
  messageType: 'success' | 'error' = 'success';
  isLoading = false;

  constructor(
    private http: HttpClient,
    public activeModal: NgbActiveModal
  ) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  updateStatus(): void {
    if (!this.id) return;

    this.isLoading = true;
    this.http.put(`${this.API_BASE}/api/item-tests/${this.id}/status`, 
      { status: this.status },
      { responseType: 'text' }
    ).subscribe({
      next: () => {
        this.showAlert('Durum güncellendi.', 'success');
        setTimeout(() => {
          this.activeModal.close('updated');
        }, 1000);
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Bir hata oluştu';
        this.showAlert(`❌ ${errorMessage}`, 'error');
        this.isLoading = false;
      }
    });
  }

  private showAlert(message: string, type: 'success' | 'error'): void {
    this.messageText = message;
    this.messageType = type;
    this.showMessage = true;
    
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }

  dismiss(): void {
    this.activeModal.dismiss('cancel');
  }
}