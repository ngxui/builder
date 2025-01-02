import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { FormGroupComponent } from '../form-group/form-group.component';
import {FormContainerComponent } from '@ngxui/form-core'

@Component({
  selector: 'ngxui-bulma-form',
  imports: [ReactiveFormsModule, NgForOf, FormGroupComponent, NgIf],
  templateUrl: './form-builder.component.html',
  standalone: true,
})
export class NgxBulmaFormBuilderComponent extends FormContainerComponent{}
