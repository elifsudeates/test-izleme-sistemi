import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
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
      if (this.filterParams[key as keyof typeof this.filterParams]) {
        queryParams[key] = this.filterParams[key as keyof typeof this.filterParams];
      }
    });

    this.router.navigate(['/kalite-rapor'], { queryParams });
  }

  navigateToAdd() {
    this.router.navigate(['/sonuc']);
  }
}
