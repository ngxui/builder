import { FormControl, ValidatorFn } from '@angular/forms';
import { ValidatorConfig } from './validator-config.model';
import { ConditionalOptions } from './field-options.model';

export class NgxFormControl extends FormControl {
  absolutePath: string;
  validatorsConfig?: ValidatorConfig[];
  conditional?: ConditionalOptions;

  constructor(
    formState: any,
    absolutePath: string,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | null,
    validatorsConfig?: ValidatorConfig[],
    conditional?:ConditionalOptions
  ) {
    super(formState, validatorOrOpts);
    this.absolutePath = absolutePath;
    this.validatorsConfig = validatorsConfig;
    this.conditional = conditional;
  }
}
