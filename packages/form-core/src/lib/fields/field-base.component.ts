import { Component, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FieldConfig, NgxValidatorError } from '@ngxui/common';

@Component({
  selector: 'ngxui-form-field-base',
  imports: [],
  template: '',
  standalone: true,
})
/**
 * A component that handles form field configurations and validation states.
 *
 * This component manages the form field configuration (`FieldConfig`), determines if
 * the field is disabled based on its settings, tracks whether the form has been
 * submitted, and provides methods to handle error messages, validation states, and
 * interaction states like touched and disabled.
 */
export class FieldBaseComponent implements OnDestroy {
  private _isSubmitted: boolean;
  private _field: FieldConfig;

  // Subject to manage component destruction lifecycle
  destroy$ = new Subject<void>();

  /**
   * Sets the field configuration and updates the disabled state accordingly.
   *
   * @param {FieldConfig} field - The field configuration that defines the field's behavior.
   */
  @Input({ required: true })
  set field(field: FieldConfig) {
    this._field = field;
    this.setDisabled();
  }

  /**
   * Gets the current field configuration.
   *
   * @returns {FieldConfig} The field configuration.
   */
  get field(): FieldConfig {
    return this._field;
  }

  /**
   * Sets the submitted state of the form.
   *
   * @param {boolean} value - Indicates if the form has been submitted.
   */
  @Input({ required: true })
  set isSubmitted(value: boolean) {
    this._isSubmitted = value;
  }

  /**
   * Gets the submitted state of the form.
   *
   * @returns {boolean} True if the form has been submitted, false otherwise.
   */
  get isSubmitted(): boolean {
    return this._isSubmitted;
  }

  /**
   * Disables or enables the form control based on the field configuration.
   *
   * If `field.options.disabled` is true, the field control is disabled; otherwise,
   * the field control is enabled.
   */
  setDisabled() {
    if (!this.field.control || this.field?.options?.disabled === undefined) {
      return;
    }
    if (this.field?.options?.disabled) {
      this.field.control.disable();
    } else {
      this.field.control.enable();
    }
  }

  /**
   * Determines if the form control is invalid.
   *
   * @returns {boolean} True if the control is invalid, false otherwise.
   */
  get isInvalid(): boolean {
    return !!this.field?.control?.invalid;
  }

  /**
   * Determines if the form control has an 'ngxError'.
   *
   * @returns {boolean} True if the control has a custom error (`ngxError`), false otherwise.
   */
  get hasError(): boolean {
    return !!this.field?.control?.hasError('ngxError');
  }

  /**
   * Retrieves the error message associated with 'ngxError' from the form control.
   *
   * @returns {string} The error message associated with the 'ngxError' validator, if available.
   */
  get errorMessage(): string {
    return this.field?.control?.getError('ngxError')?.errorMessage;
  }

  /**
   * Determines if the form control has been touched.
   *
   * @returns {boolean} True if the control has been touched, false otherwise.
   */
  get touched(): boolean {
    return !!this.field?.control?.touched;
  }

  /**
   * Determines if the error message should be shown based on the control's state.
   *
   * The error message is shown if:
   * - The control has an error and has been touched (with the condition that
   *   `showMessageAfterSubmit` is false), or
   * - The control has an error and the form has been submitted.
   *
   * @returns {boolean} True if the error message should be shown, false otherwise.
   */
  get ShowError(): boolean {
    const error: NgxValidatorError = this.field?.control?.getError('ngxError');
    return (this.hasError && this.touched && !error.showMessageAfterSubmit) || (this.hasError && this.isSubmitted);
  }

  /**
   * Cleans up the component when it is destroyed.
   *
   * This method ensures that any resources (like subscriptions) are properly disposed of
   * when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
