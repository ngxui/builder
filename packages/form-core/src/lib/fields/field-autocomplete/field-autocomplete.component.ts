import { Component } from '@angular/core';
import { NxFieldAutocompleteBaseComponent } from './field-autocomplete-base.component';

@Component({
  selector: 'ngxui-form-autocomplete',
  imports: [],
  template: '',
})
export class NgxFieldAutocompleteComponent extends NxFieldAutocompleteBaseComponent{
  _value: any;

  get value(): any{
    return this.field?.control?.value
  }

  set value(value: any){
    this.field?.control?.setValue(value);
  }

}
