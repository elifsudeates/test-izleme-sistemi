import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { TestSonucYuklemeComponent } from './index/sonuc/sonuc.component';
import { KaliteRaporuComponent } from './index/kalite-rapor/kalite-rapor.component';
import { DevicesComponent } from './index/devices/devices.component';

const routes: Routes = [
  {path:'index',component:IndexComponent},
  {path:'sonuc',component:TestSonucYuklemeComponent},
  {path: 'kalite-rapor',component:KaliteRaporuComponent},
  {path: 'devices',component:DevicesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
