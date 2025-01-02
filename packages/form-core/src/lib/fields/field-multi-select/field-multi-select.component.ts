import { Component } from '@angular/core';
import { NxFieldAutocompleteBaseComponent } from '../field-autocomplete/field-autocomplete-base.component';
import { LabelValue } from '@ngxui/common';

@Component({
  selector: 'ngxui-form-multi-select',
  imports: [],
  template: '',
})
export class NgxFieldMultiSelectComponent extends NxFieldAutocompleteBaseComponent {
  _value: any;

  get value(): any {
    return this.field?.control?.value;
  }

  set value(value: any) {
    this.field?.control?.setValue(value);
  }

  get optionsList(): LabelValue[] {
    return this.field.options?.optionsList || [];
  }
}
