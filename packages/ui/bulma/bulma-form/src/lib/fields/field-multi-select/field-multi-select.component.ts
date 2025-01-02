import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFieldMultiSelectComponent } from '@ngxui/form-core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ngxui-bulma-multi-select',
  imports: [CommonModule, NgSelectComponent, FormsModule],
  templateUrl: './field-multi-select.component.html',
})
export class FieldMultiSelectComponent extends NgxFieldMultiSelectComponent {
  onSearch(event: {term: string, items: any[]}){
    this.fetchAndApplyOptions(event.term);
  }

}
