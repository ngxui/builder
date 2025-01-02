import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { FormGroupConfig } from './form.model';
import { Subject } from 'rxjs';
import { FieldConfig, NestedArray } from '@ngxui/common';
import { ngxFormEvaluator } from '@ngxui/eval-form-expr';

@Component({
  selector: 'ngxui-form-core',
  template: '',
  providers: [],
})
export abstract class FormCoreComponent implements OnInit, OnDestroy {
  @Input({required: true}) formConfig: FormGroupConfig; // Configuration for the form group.
  @Input({required: true}) parentFormGroup: FormGroup; // The parent form group that holds the form controls.
  @Input() isSubmitted = false; // Tracks whether the form has been submitted.

  // Subject for handling component cleanup
  destroy$ = new Subject<void>();

  /**
   * Abstract method to set the field map for the form.
   * This method should be implemented in the derived class.
   *
   * @returns {void}
   */
  abstract setFieldMap(): void;

  fieldsMap: { [key: string]: any }; // A mapping of field names to components or controls.

  /**
   * Initializes the component by setting up field map, form controls,
   * and the initial control state.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.setFieldMap();
    this.setFieldControls();
    this.setFieldSControlState();
  }

  /**
   * Retrieves the component for a specific field from the `fieldsMap`.
   *
   * @param {string} field - The name of the field to retrieve the component for.
   * @returns {any} The component associated with the given field.
   */
  getFieldComponent(field: string): any {
    return this.fieldsMap[field];
  }

  /**
   * Retrieves the `FormGroup` associated with this component.
   *
   * @returns {FormGroup} The form group for this component.
   */
  get formGroup(): FormGroup {
    return this.parentFormGroup.get(this.formConfig.name) as FormGroup;
  }

  /**
   * Retrieves an array of `FieldConfig` objects for all the fields in the form configuration.
   *
   * @returns {FieldConfig[]} An array of `FieldConfig` objects representing the fields in the form.
   */
  getFields(): FieldConfig[] {
    return this.formConfig.rows.flatMap((row) => row.fields) || [];
  }

  /**
   * Sets up the form controls by assigning the corresponding `FormControl` to each field.
   *
   * @returns {void}
   */
  setFieldControls(): void {
    const fields = this.getFields();
    for (const field of fields) {
      field.control = <FormControl>this.formGroup?.get(field.name);
    }
  }

  /**
   * Determines whether a given field can be displayed based on its `conditional.display` configuration.
   *
   * @param {FieldConfig} field - The field configuration object.
   * @returns {boolean} `true` if the field can be displayed, otherwise `false`.
   */
  canDisplay(field: FieldConfig): boolean {
    const displayConfig = field.options?.conditional?.display;
    if (displayConfig) {
      return ngxFormEvaluator(
        this.parentFormGroup,
        <NestedArray>field.options?.conditional?.display
      );
    }
    return true;
  }

  /**
   * Sets the enabled/disabled state of a form control based on the field's `conditional.disabled` configuration.
   *
   * @param {FieldConfig} field - The field configuration object.
   * @returns {void}
   */
  private setFieldControlState(field: FieldConfig): void {
    const formControl = field.control;
    if (!formControl) {
      return;
    }
    if (
      ngxFormEvaluator(this.parentFormGroup, <NestedArray>field.options?.conditional?.disabled)
    ) {
      formControl.disable({ emitEvent: false });
    } else if (!field.options?.disabled) {
      formControl.enable({ emitEvent: false });
    }
  }

  /**
   * Sets the state (enabled/disabled) of all fields that have conditional `disabled` configurations.
   * This method subscribes to the form group's value changes to update the state dynamically.
   *
   * @returns {void}
   */
  setFieldSControlState(): void {
    const fields = this.getFields().filter(
      (field) => !!field.options?.conditional?.disabled
    );
    if (!fields.length) {
      return;
    }
    this.formGroup.valueChanges.subscribe(() => {
      for (const field of fields) {
        this.setFieldControlState(field);
      }
    });
  }

  /**
   * Cleans up the component when it is destroyed.
   *
   * This method completes the `destroy$` subject to avoid memory leaks and unsubscribe from observables.
   *
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
