// devices.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Device {
  id: number;
  is_emri: string;
  aselsan_is_emri: string;
  parca_no: string;
  tanimi: string;
  seri_no: string;
}

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  API_BASE = 'http://localhost:3000';
  parcaNo: string = '';
  deviceList: Device[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.parcaNo = params['parcaNo'] || '';
      this.fetchDevices();
    });
  }

  fetchDevices(): void {
    if (!this.parcaNo) return;

    this.http.get<Device[]>(`${this.API_BASE}/api/items`, {
      params: { parcaNo: this.parcaNo }
    }).subscribe({
      next: (data) => {
        this.deviceList = data;
      },
      error: (error) => {
        console.error('Error fetching devices:', error);
      }
    });
  }

  clearSearch(): void {
    this.parcaNo = '';
    this.deviceList = [];
    this.router.navigate(['/devices']);
  }

  selectItem(id: number): void {
    sessionStorage.setItem('selectedItemId', id.toString());
    this.router.navigate(['/sonuc']);
  }
}