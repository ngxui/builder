import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFieldAutocompleteComponent } from '@ngxui/form-core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ngxui-bulma-autocomplete',
  imports: [CommonModule, NgSelectComponent, FormsModule],
  templateUrl: './field-autocomplete.component.html',
})
export class FieldAutocompleteComponent extends NgxFieldAutocompleteComponent {
  onSearch(event: {term: string, items: any[]}){
    this.fetchAndApplyOptions(event.term);
  }

}
