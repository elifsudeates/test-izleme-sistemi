// search.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class TestAramaComponent {
  API_BASE = 'http://localhost:3000'; // backend root
  partNumber: string = '';
  showWarning: boolean = false;

  constructor(private router: Router) {}

  onSearch() {
    if (!this.partNumber.trim()) {
      this.showWarning = true;
      return;
    }

    this.showWarning = false;
    this.navigateToDevices();
  }

  private navigateToDevices() {
    this.router.navigate(['/devices'], {
      queryParams: { parcaNo: this.partNumber }
    });
  }
}