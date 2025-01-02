import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxRadioFieldComponent } from '@ngxui/form-core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ngxui-bulma-radio',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './radio-field.component.html',
})
export class RadioFieldComponent extends NgxRadioFieldComponent {

}
