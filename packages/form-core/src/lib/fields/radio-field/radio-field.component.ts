import { Component } from '@angular/core';
import { FieldBaseComponent } from '../field-base.component';
import { LabelValue } from '@ngxui/common';

@Component({
  selector: 'ngxui-form-radio',
  imports: [],
  template: '',
})
export class NgxRadioFieldComponent extends FieldBaseComponent {
  get optionsList(): LabelValue[] {
    return this.field.options?.optionsList || [];
  }

}
