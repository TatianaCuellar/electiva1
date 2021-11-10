import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultadosRoutingModule } from './resultados-routing.module';
import { ResultadosComponent } from './resultados.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [ResultadosComponent],
    imports: [
        CommonModule,
        ResultadosRoutingModule,
        ReactiveFormsModule
    ]
})
export class ResultadosModule { }
