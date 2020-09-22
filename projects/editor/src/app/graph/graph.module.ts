import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { G6GraphModule } from 'ng-antv-g6';

import { FormCanvasComponent } from './form-canvas/form-canvas.component';
import { FormNodeComponent } from './form-node/form-node.component';
import { FormEdgeComponent } from './form-edge/form-edge.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { EditorComponent } from './editor/editor.component';



@NgModule({
  declarations: [
    EditorComponent,
    FormCanvasComponent,
    FormNodeComponent,
    FormEdgeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    G6GraphModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatSlideToggleModule,
    RouterModule.forChild([{ path: '', component: EditorComponent }])
  ],
})
export class GraphModule { }
