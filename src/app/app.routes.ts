import { Routes } from '@angular/router';
import { HomePageComponent } from './modules/home/pages/home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: '**', redirectTo: '' }
];
