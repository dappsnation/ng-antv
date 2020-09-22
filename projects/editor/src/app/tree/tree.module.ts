import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { G6TreeGraphModule } from 'ng-antv-g6';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';

import { EditorComponent } from './editor/editor.component';
import { FormNodeComponent } from './form-node/form-node.component';
import { FormCanvasComponent } from './form-canvas/form-canvas.component';

@NgModule({
  declarations: [
    EditorComponent,
    FormNodeComponent,
    FormCanvasComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    G6TreeGraphModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatListModule,
    RouterModule.forChild([{ path: '', component: EditorComponent }])
  ],
})
export class TreeModule { }
