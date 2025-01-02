import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSelectFieldComponent } from '@ngxui/form-core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ngxui-bulma-select',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './select-field.component.html',
})
export class SelectFieldComponent extends NgxSelectFieldComponent {

}
