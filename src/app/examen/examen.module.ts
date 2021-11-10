import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamenRoutingModule } from './examen-routing.module';
import { ExamenComponent } from './examen.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [ExamenComponent],
    imports: [
        CommonModule,
        ExamenRoutingModule,
        ReactiveFormsModule
    ]
})
export class ExamenModule { }
