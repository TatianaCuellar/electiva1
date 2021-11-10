import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExamenComponent} from './examen.component';

const routes: Routes = [
  { path: '', component: ExamenComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamenRoutingModule { }
