import { FieldConfig } from '@ngxui/common';

export interface RowConfig {
  fields: FieldConfig[]; // Fields in this row
}

export interface FormGroupConfig {
  name: string;
  rows: RowConfig[];
  submitButtonText?: string;
  resetButtonText?: string;
  additionalProperties?: Record<string, any>;
}

export interface FormConfig {
  name: string;
  groups: FormGroupConfig[];
}
