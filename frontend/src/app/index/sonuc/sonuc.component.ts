// sonuc.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface ItemData {
  id: number;
  is_emri: string;
  aselsan_is_emri: string;
  parca_no: string;
  seri_no: string;
  tanimi: string;
}

interface Test {
  id: number;
  item_no: string;
  name: string;
}

@Component({
  selector: 'app-sonuc',
  templateUrl: './sonuc.component.html',
  styleUrls: ['./sonuc.component.scss']
})
export class TestSonucYuklemeComponent implements OnInit {
 
  API_BASE = 'http://localhost:3000';
  selectedItemId: string | null = null;
  itemData: ItemData = {} as ItemData;
  tests: Test[] = [];
  selectedTestId: number | null = null;
  testZamani: string = '';
  selectedFile: File | null = null;
  isUploading = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.selectedItemId = sessionStorage.getItem('selectedItemId');
    if (!this.selectedItemId) {
      alert('Önce cihaz seçmelisiniz.');
      this.router.navigate(['/']);
      return;
    }

    this.loadItemData();
    this.loadTests();
  }

  loadItemData(): void {
    this.http.get<ItemData>(`${this.API_BASE}/api/items/${this.selectedItemId}`)
      .subscribe({
        next: (data) => {
          this.itemData = data;
        },
        error: () => {
          alert('Cihaz bilgileri yüklenirken hata oluştu');
          this.router.navigate(['/']);
        }
      });
  }

  // loadTests(): void {
  //   this.http.get<Test[]>(`${this.API_BASE}/api/tests`)
  //     .subscribe({
  //       next: (data) => {
  //         this.tests = data;
  //       },
  //       error: () => {
  //         alert('Test listesi yüklenirken hata oluştu');
  //       }
  //     });
  // }
  loadTests(): void {
  if (!this.selectedItemId) return;

  this.http.get<Test[]>(`${this.API_BASE}/api/test-item/${this.selectedItemId}`)
    .subscribe({
      next: (data) => {
        this.tests = data;
      },
      error: () => {
        alert('Test listesi yüklenirken hata oluştu');
      }
    });
}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (!this.selectedFile) return;

    this.isUploading = true;
    
    const formData = new FormData();
    formData.append('item_id', this.selectedItemId || '');
    formData.append('test_id', this.selectedTestId?.toString() || '');
    formData.append('test_zamani', this.testZamani);
    formData.append('testFile', this.selectedFile);

    this.http.post(`${this.API_BASE}/api/item-tests`, formData)
      .subscribe({
        next: () => {
          alert('✅ Test sonucu kaydedildi.');
          this.router.navigate(['/kalite-rapor']);
        },
        error: (err) => {
          const errorMessage = err.error?.error || 'Sunucu hatası';
          alert(`❌ ${errorMessage}`);
          this.isUploading = false;
        }
      });
  }

}