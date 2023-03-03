import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { ILabelConfig } from '@antv/g6';
import { IG6GraphEvent, IPoint, LabelStyle, ModelConfig, ShapeStyle, StateStyles } from '@antv/g6';

export const itemKeys = [
  'shape', 'type', 'label', 'labelCfg', 'x', 'y',
  'size', 'color', 'anchorPoints', 'startPoint', 'endPoint',
  'visible', 'style', 'stateStyles'
] as const;

function copy(from: Record<string, unknown>, to: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    if (from[key]) {
      to[key] = from[key];
    }
  }
}

@Directive()
export abstract class G6Item<Config extends ModelConfig> {
  protected abstract readonly keys: (Extract<keyof Config, string>)[];

  @Input() shape?: string;
  @Input() type?: string;
  @Input() label?: string | LabelStyle;
  @Input() labelCfg?: ILabelConfig;
  @Input() x?: number;
  @Input() y?: number;
  @Input() size?: number | number[];
  @Input() color?: string;
  @Input() anchorPoints?: number[][];
  @Input() startPoint?: IPoint;
  @Input() endPoint?: IPoint;
  @Input() visible?: boolean;
  @Input() style?: ShapeStyle;
  @Input() stateStyles?: StateStyles;
  
  @Input()
  set config(item: Config) {
    copy(item, this as any, this.keys)
  }
  get config(): Config {
    const item = {};
    copy(this as any, item, this.keys)
    return item as Config;
  }

  @Output() click = new EventEmitter<IG6GraphEvent>();
  @Output() contextmenu = new EventEmitter<IG6GraphEvent>();
  @Output() dbclick = new EventEmitter<IG6GraphEvent>();
  @Output() mouseenter = new EventEmitter<IG6GraphEvent>();
  @Output() mouseleave = new EventEmitter<IG6GraphEvent>();
  @Output() mousemove = new EventEmitter<IG6GraphEvent>();
  @Output() hover = new EventEmitter<IG6GraphEvent>();
  @Output() wheel = new EventEmitter<IG6GraphEvent>();
  @Output() selectChange = new EventEmitter<boolean>();
}