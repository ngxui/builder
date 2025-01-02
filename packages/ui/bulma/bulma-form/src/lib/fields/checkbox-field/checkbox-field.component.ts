import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCheckboxFieldComponent } from '@ngxui/form-core';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'ngxui-bulma-checkbox',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkbox-field.component.html',
})
export class CheckboxFieldComponent extends NgxCheckboxFieldComponent {}
