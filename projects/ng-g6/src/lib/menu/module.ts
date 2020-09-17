import { NgModule } from '@angular/core';

import { G6Menu } from './menu';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [G6Menu],
  exports: [G6Menu],
  imports: [OverlayModule],
})
export class G6MenuModule { }
