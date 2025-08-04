// rapor.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rapor',
  templateUrl: './rapor.component.html',
  styleUrls: ['./rapor.component.scss']
})
export class TestSonucComponent {
  API_BASE = 'http://localhost:3000'; // Geliştirme ortamı için
  
  quickSearchPartNumber: string = '';
  showQuickSearchWarning: boolean = false;

  filterParams = {
    isEmri: '',
    aselsanIsEmri: '',
    parcaNo: '',
    seriNo: ''
  };

  constructor(private router: Router) {}

  onQuickSearch() {
    if (!this.quickSearchPartNumber.trim()) {
      this.showQuickSearchWarning = true;
      return;
    }

    this.showQuickSearchWarning = false;
    this.router.navigate(['/devices'], {
      queryParams: { parcaNo: this.quickSearchPartNumber }
    });
  }

  onFilterSubmit() {
    const queryParams: any = {};
    
    // Sadece dolu olan parametreleri ekle
    Object.keys(this.filterParams).forEach(key => {
      const value = this.filterParams[key as keyof typeof this.filterParams];
      if (value) {
        queryParams[key] = value;
      }
    });

    this.router.navigate(['/kalite-rapor'], { queryParams });
  }

  resetFilterForm() {
    this.filterParams = {
      isEmri: '',
      aselsanIsEmri: '',
      parcaNo: '',
      seriNo: ''
    };
  }

  navigateToAdd() {
    this.router.navigate(['/sonuc']);
  }
}