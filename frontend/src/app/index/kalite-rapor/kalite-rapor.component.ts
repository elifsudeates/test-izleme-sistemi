import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StatusPopupComponent } from '../pop-up/pop-up.component';
import { DeleteConfirmModalComponent } from '../delete-confirm-modal.component';

interface TestResult {
  id: number;
  is_emri: string;
  aselsan_is_emri: string;
  parca_no: string;
  tanimi: string;
  seri_no: string;
  test_name: string;
  test_zamani: string;
  created_date: string;
  status: string;
  checked?: boolean;
}

@Component({
  selector: 'app-kalite-rapor',
  templateUrl: './kalite-rapor.component.html',
  styleUrls: ['./kalite-rapor.component.scss']
})
export class KaliteRaporuComponent implements OnInit {
  API_BASE = 'http://localhost:3000';
  testResults: TestResult[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadTestResults();
  }

  loadTestResults(): void {
    const queryParams = this.route.snapshot.queryParams;
    this.http.get<TestResult[]>(`${this.API_BASE}/api/item-tests`, { params: queryParams })
      .subscribe({
        next: (data) => {
          this.testResults = data.map(item => ({
            ...item,
            checked: false
          }));
        },
        error: (error) => {
          console.error('Test sonuçları yüklenirken hata:', error);
        }
      });
  }

  toggleAllCheckboxes(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.testResults.forEach(item => item.checked = isChecked);
  }

  // Yeni eklenen silme fonksiyonu
  deleteTest(id: number): void {
    const modalRef = this.modalService.open(DeleteConfirmModalComponent, {
      centered: true,
      backdrop: 'static'
    });

    modalRef.result.then(
      (result) => {
        if (result === 'confirmed') {
          this.http.delete(`${this.API_BASE}/api/item-tests/${id}`)
            .subscribe({
              next: () => {
                this.loadTestResults();
              },
              error: (error) => {
                console.error('Silme işlemi başarısız:', error);
              }
            });
        }
      },
      (reason) => {
        console.log('Silme işlemi iptal edildi:', reason);
      }
    );
  }

  openStatusPopup(id: number, status: string): void {
    const modalRef = this.modalService.open(StatusPopupComponent, {
      windowClass: 'status-popup-modal',
      centered: true,
      backdrop: 'static'
    });
    
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.status = status;

    modalRef.result.then(
      (result) => {
        if (result === 'updated') {
          this.loadTestResults();
        }
      },
      (reason) => {
        console.log('Modal kapatıldı:', reason);
      }
    );
  }
}