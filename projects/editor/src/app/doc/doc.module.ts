import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DocComponent } from './doc.component';



@NgModule({
  declarations: [DocComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DocComponent }])
  ]
})
export class DocModule { }
