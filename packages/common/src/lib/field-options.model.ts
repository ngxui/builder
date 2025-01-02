import { LabelValue } from './option.model';
import { DataLoaderConfig } from './data-loader-config.model';

export interface FieldOptions {
  label: string;
  value?: any;
  disabled?: boolean;
  conditional?: ConditionalOptions;
  placeholder?: string;
  helperText?: string;
  optionsList?: LabelValue[];
  onchange?: any;
  [key: string]: any;
  loader?: DataLoaderConfig;
}
export interface ConditionalOptions{
  display?: any;
  disabled?: any;
}
