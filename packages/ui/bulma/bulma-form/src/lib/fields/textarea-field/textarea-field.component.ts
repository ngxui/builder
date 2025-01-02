import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTextareaFieldComponent } from '@ngxui/form-core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ngxui-bulma-textarea',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './textarea-field.component.html',
})
export class TextareaFieldComponent extends NgxTextareaFieldComponent {}
