import { FormControl } from '@angular/forms';
import { ValidatorConfig } from './validator-config.model';
import { FieldOptions } from './field-options.model';

export interface FieldConfig {
  name: string;
  type: string;
  value?: any;
  options?: FieldOptions;
  validators?: ValidatorConfig[];
  control?: FormControl;
  layout?: {
    width?: number;
  };
}
