import { Component } from '@angular/core';
import { NgClass, NgComponentOutlet, NgForOf, NgIf } from '@angular/common';
import { FormCoreComponent } from '@ngxui/form-core';
import { TextareaFieldComponent } from '../../fields/textarea-field/textarea-field.component';
import { CheckboxFieldComponent } from '../../fields/checkbox-field/checkbox-field.component';
import { InputFieldComponent } from '../../fields/input-field/input-field.component';
import { RadioFieldComponent } from '../../fields/radio-field/radio-field.component';
import { SelectFieldComponent } from '../../fields/select-field/select-field.component';
import { FieldAutocompleteComponent } from '../../fields/field-autocomplete/field-autocomplete.component';
import { FieldMultiSelectComponent } from '../../fields/field-multi-select/field-multi-select.component';

@Component({
  selector: 'ngxui-bulma-form-group',
  imports: [NgForOf, NgClass, NgComponentOutlet, NgIf],
  templateUrl: './form-group.component.html',
})
export class FormGroupComponent extends FormCoreComponent {
  setFieldMap(): void {
    this.fieldsMap = {
      text: TextareaFieldComponent,
      checkbox: CheckboxFieldComponent,
      input: InputFieldComponent,
      number: InputFieldComponent,
      radio: RadioFieldComponent,
      select: SelectFieldComponent,
      'auto-complete': FieldAutocompleteComponent,
      'multi-select': FieldMultiSelectComponent,
    };
  }
  getColumnClass(layout: any): string|null {
    if(!layout?.width){
      return null;
    }
    const widthClass = layout?.width ? `is-${layout.width}` : 'is-12';
    const offsetClass = layout?.offset ? `is-offset-${layout.offset}` : '';
    return `${widthClass} ${offsetClass}`.trim();
  }

}
