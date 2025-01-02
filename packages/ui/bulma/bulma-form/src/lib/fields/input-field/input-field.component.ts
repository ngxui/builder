import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxInputFieldComponent } from '@ngxui/form-core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ngxui-bulma-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-field.component.html',
})
export class InputFieldComponent extends NgxInputFieldComponent {}
