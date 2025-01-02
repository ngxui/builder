import { NestedArray } from './shared-models';

export interface NgxValidatorError{
  name: string;
  message: string;
  showMessageAfterSubmit?: boolean;

}

export interface ValidatorConfig extends NgxValidatorError{
  value?: NestedArray | number|string|null;
  enableCondition?: NestedArray;
}
