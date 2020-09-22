import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DocComponent } from './doc.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { StartComponent } from './start/start.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownModule } from 'ngx-markdown';

const routes: Route[] = [{
  path: '',
  component: DocComponent,
  children: [{
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  }, {
    path: 'start',
    component: StartComponent,
  }]
}]

@NgModule({
  declarations: [DocComponent, StartComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forChild(routes),
    MarkdownModule.forRoot({ loader: HttpClient }),
  ]
})
export class DocModule { }
