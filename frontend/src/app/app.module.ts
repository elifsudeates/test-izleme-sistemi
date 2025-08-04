import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { KaliteRaporuComponent } from './index/kalite-rapor/kalite-rapor.component';
import { StatusPopupComponent } from './index/pop-up/pop-up.component';
import { TestSonucComponent } from './index/rapor/rapor.component';
import { TestAramaComponent } from './index/search/search.component';
import { TestSonucYuklemeComponent } from './index/sonuc/sonuc.component';
import { AppRoutingModule } from './app-routing.module';
import { IndexComponent } from './index/index.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { DevicesComponent } from './index/devices/devices.component';
import { DeleteConfirmModalComponent } from './index/delete-confirm-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    DevicesComponent,
    KaliteRaporuComponent,
    StatusPopupComponent,
    TestSonucComponent,
    TestAramaComponent,
    TestSonucYuklemeComponent,
    IndexComponent,
    DeleteConfirmModalComponent // Yeni eklenen component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }