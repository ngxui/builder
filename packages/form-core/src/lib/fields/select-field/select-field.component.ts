import { Component } from '@angular/core';
import { FieldBaseComponent } from '../field-base.component';
import { LabelValue } from '@ngxui/common';

@Component({
  selector: 'ngxui-form-select',
  imports: [],
  template: '',
})
export class NgxSelectFieldComponent extends FieldBaseComponent {
  get optionsList(): LabelValue[] {
    return this.field.options?.optionsList || [];
  }

}
