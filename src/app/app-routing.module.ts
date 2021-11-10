import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'examen',  loadChildren: () => import('./examen/examen.module').then(m => m.ExamenModule) },
  { path: 'resultados',  loadChildren: () => import('./resultados/resultados.module').then(m => m.ResultadosModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
