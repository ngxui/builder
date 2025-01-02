import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { debounceTime, Observable, pairwise, startWith } from 'rxjs';
import { FormConfig } from '../form.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  FieldConfig,
  HttpMethod,
  NestedArray,
  NgxFormControl,
  ValidatorConfig,
} from '@ngxui/common';
import { FieldValidatorService } from './field-validator.service';

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private fieldValidatorService: FieldValidatorService
  ) {}

  /**
   * Creates a form group from a set of field configurations.
   *
   * This method dynamically generates a form group based on the provided field configurations.
   * It initializes each form control with its corresponding value, validators, and other metadata.
   * Additionally, it supports conditional fields and absolute path generation for nested fields.
   *
   * @param {string} groupName - The name of the group to which the fields belong.
   * @param {FieldConfig[]} fields - An array of field configurations that define the form controls.
   * @param {FormGroup} rootFormGroup - The root form group for context when retrieving validators.
   * @returns {FormGroup} A new `FormGroup` instance populated with the specified fields and configurations.
   */
  getFormGroupFromFields(
    groupName: string,
    fields: FieldConfig[],
    rootFormGroup: FormGroup
  ): FormGroup {
    const group: Record<string, FormControl> = {};
    for (const field of fields) {
      const validators: any[] = [];
      if (field.validators) {
        field.validators.forEach((validatorName: ValidatorConfig) => {
          const validator = this.getValidators(
            validatorName,
            field,
            rootFormGroup
          );
          if (validator) {
            validators.push(validator);
          }
        });
      }
      const absolutePath = field.name.includes('.')
        ? field.name
        : `${groupName}.${field.name}`;
      // TODO typing  NgxFormControl
      group[field.name] = new NgxFormControl(
        field.value || null,
        absolutePath,
        validators,
        field.validators,
        field.options?.conditional
      );
    }
    return this.fb.group(group);
  }

  /**
   * Configures and sets up form groups within a parent form group.
   *
   * This method processes a form configuration object to dynamically create
   * and add form groups to the provided parent form group. It extracts fields
   * from the group definitions, creates corresponding form groups, and applies
   * validators to the parent form group.
   *
   * @param {FormConfig} formConfig - The configuration object containing group and field definitions.
   * @param {FormGroup} parentFormGroup - The parent form group to which the dynamically created form groups will be added.
   */
  setFormGroups(formConfig: FormConfig, parentFormGroup: FormGroup) {
    const formGroups = formConfig.groups || [];
    for (const group of formGroups) {
      const fields = group.rows.flatMap((row) => row.fields);
      parentFormGroup.addControl(
        group.name,
        this.getFormGroupFromFields(group.name, fields, parentFormGroup)
      );
    }
    this.onFormValeChanges(parentFormGroup);
  }

  onFormValeChanges(parentFormGroup: FormGroup){
    parentFormGroup.valueChanges
      .pipe(
        debounceTime(200),
      )
      .pipe(
        startWith(parentFormGroup.value),
        pairwise(),
      )
      .subscribe(([previousValue, currentValue]) => {
        const changedFields = this.getChangedFields(previousValue, currentValue);
        if(changedFields?.length) {
          this.updateValidatorValueAndValidity(parentFormGroup, changedFields);
        }
      });
  }
  getChangedFields(previousValue: any, currentValue: any): string[] {
    const flattenPreviousValue = this.flattenObject(previousValue);
    const flattenCurrentValue = this.flattenObject(currentValue);
    return Object.keys(flattenCurrentValue).filter(
      (key) => flattenPreviousValue[key] !== flattenCurrentValue[key]
    );
  }
   flattenObject(obj: any): any  {
    const resultObj: any = {};
    for (const i in obj) {
      if (typeof obj[i] === 'object' &&
        !Array.isArray(obj[i])) {
        const tempObj = this.flattenObject(obj[i]);
        for (const j in tempObj) {
          resultObj[i + '.' + j] = tempObj[j];
        }
      } else {
        resultObj[i] = obj[i];
      }
    }
    return resultObj;
  };

  /**
   * Retrieves a validation function based on the provided validator configuration.
   *
   * This method maps a validator name from the configuration to its corresponding
   * Angular or custom validator function. If the validator is not enabled or not found,
   * it returns `null`. Validators are created using the `fieldValidatorService`, which
   * provides base and custom validation functionality.
   *
   * @param {ValidatorConfig} validatorConfig - The configuration object defining the validator type and its settings.
   * @param {FieldConfig} field - The field configuration associated with the validator.
   * @param {FormGroup} rootFormGroup - The root form group used for context when applying validators.
   * @returns {ValidationErrors | null} The validation function for the specified validator, or `null` if not applicable.
   */
  getValidators(
    validatorConfig: ValidatorConfig,
    field: FieldConfig,
    rootFormGroup: FormGroup
  ): ValidationErrors | null {
    /**
     *  if validator not enabled return null
     *
     */
    const validators: Record<string, ValidationErrors> = {
      required: this.fieldValidatorService.nxBaseValidator(
        Validators.required,
        validatorConfig,
        field,
        rootFormGroup
      ),
      email: this.fieldValidatorService.nxBaseValidator(
        Validators.email,
        validatorConfig,
        field,
        rootFormGroup
      ),
      maxLength: this.fieldValidatorService.nxBaseValidator(
        Validators.maxLength,
        validatorConfig,
        field,
        rootFormGroup,
        true
      ),
      minLength: this.fieldValidatorService.nxBaseValidator(
        Validators.minLength,
        validatorConfig,
        field,
        rootFormGroup,
        true
      ),
      pattern: this.fieldValidatorService.nxBaseValidator(
        Validators.pattern,
        validatorConfig,
        field,
        rootFormGroup,
        true
      ),
      nullValidator: this.fieldValidatorService.nxBaseValidator(
        Validators.nullValidator,
        validatorConfig,
        field,
        rootFormGroup
      ),
      requiredTrue: this.fieldValidatorService.nxBaseValidator(
        Validators.requiredTrue,
        validatorConfig,
        field,
        rootFormGroup
      ),
      domainValidator: this.fieldValidatorService.ngxValidator(
        validatorConfig,
        field,
        rootFormGroup
      ),
    };
    return validators[validatorConfig.name] || null;
  }

  /**
   * Updates the validity of form controls that depend on specific fields within a FormGroup.
   *
   * This method identifies all controls with dependencies (fields they rely on for validation)
   * and checks if any of these dependencies have been updated. If so, it triggers an update
   * to the value and validity of the affected controls without emitting change events.
   *
   * @param formGroup - The FormGroup containing the form controls to evaluate.
   * @param updatedFields - An array of field names that were updated, used to determine
   *                        which controls need their validators recalculated.
   *
   * @returns void
   *
   * ### Process:
   * 1. Retrieves all controls from the FormGroup using `getFieldCtrl`.
   * 2. Determines the dependency fields for each control by calling `getFieldCtrlDependencies`.
   * 3. Filters controls to include only those with at least one dependency.
   * 4. Checks if any of the `updatedFields` are dependencies for a given control.
   * 5. If a control depends on any updated fields, it calls `updateValueAndValidity` on the control
   *    without emitting events (`emitEvent: false`).
   *
   * ### Example:
   * ```typescript
   * // Assume `formGroup` contains fields 'field1', 'field2', and 'field3',
   * // and 'field2' has a custom validator that depends on the value of 'field1'.
   *
   * updateValidatorValueAndValidity(formGroup, ['field1']);
   * // This will trigger `updateValueAndValidity` on 'field2' if it depends on 'field1'.
   * ```
   *
   * ### Notes:
   * - This method is useful for dynamically managing interdependent fields in complex forms.
   * - The `getFieldCtrl` and `getFieldCtrlDependencies` methods must be implemented to retrieve
   *   controls and their respective dependencies.
   * - `updateValueAndValidity` ensures that controls are revalidated when their dependencies change.
   */
  private updateValidatorValueAndValidity(formGroup: FormGroup, updatedFields: string[]): any {
    const controls: NgxFormControl[] = this.getFieldCtrl(formGroup);
    const dependencies = controls
      .map((control) => ({
        name: control.absolutePath,
        fieldNameDependencies: [...new Set(this.getFieldCtrlDependencies(control))],
        control,
      }))
      .filter((d) => !!d.fieldNameDependencies.length)

    for (const dep of dependencies) {

      const mustUpdate = updatedFields.some((field) => new Set(dep.fieldNameDependencies).has(field));
      if(mustUpdate){
        dep.control.updateValueAndValidity({
          emitEvent: false,
        });
      }
    }
  }

  /**
   * Retrieves all `NgxFormControl` instances from a form group, including nested controls.
   *
   * This method iterates through the controls of a given form group and collects all
   * instances of `NgxFormControl`. If a control is a nested form group, it recursively
   * processes the group to retrieve its controls as well.
   *
   * @private
   * @param {FormGroup} formGroup - The form group to process for extracting `NgxFormControl` instances.
   * @returns {NgxFormControl[]} An array of all `NgxFormControl` instances found within the form group and its nested groups.
   */
  private getFieldCtrl(formGroup: FormGroup): NgxFormControl[] {
    const children = formGroup.controls;
    const fieldsCtrl: NgxFormControl[] = [];
    for (const controlName in children) {
      const control = children[controlName];
      if (control instanceof FormControl) {
        fieldsCtrl.push(<NgxFormControl>children[controlName]);
      } else if (control instanceof FormGroup) {
        fieldsCtrl.push(...this.getFieldCtrl(control));
      }
    }
    return fieldsCtrl;
  }

  /**
   * Extracts field dependencies for a given form control.
   *
   * This method analyzes the validators and trigger conditions associated with a form control
   * to determine its dependencies. Specifically, it processes domain validators and their
   * associated conditions to extract any nested field dependencies.
   *
   * @private
   * @param {NgxFormControl} control - The form control whose dependencies are being determined.
   * @returns {string[]} An array of field dependency names extracted from the control's validators and trigger conditions.
   */
  private getFieldCtrlDependencies(control: NgxFormControl): string[] {
    const domainValidators =
      control.validatorsConfig?.filter((c) => c.name === 'domainValidator') ||
      [];
    const validatorWithCondition =
      control.validatorsConfig?.filter((c) => !!c.enableCondition?.length) ||
      [];
    const domainValidatorsWithValue = domainValidators.flatMap((v) => v.value || []);
    const enableCondition = validatorWithCondition.flatMap(
      (v) => v.enableCondition || []
    );
    const validatorDomainDependencies =
      this.getFieldDependencies(domainValidatorsWithValue) || [];
    const triggerConditionsDependencies =
      this.getFieldDependencies(enableCondition) || [];
    return [...validatorDomainDependencies, ...triggerConditionsDependencies];
  }

  /**
   * Extracts field dependencies from a nested array structure.
   *
   * This method iterates through a nested array and extracts strings from
   * specific positions within subarrays that match certain criteria.
   * It identifies dependencies by:
   * - Extracting the first element of subarrays of length 3, where the first element is a string.
   * - Extracting the substring (excluding the `$` symbol) of the third element of subarrays of length 3, where the third element is a string starting with `$`.
   * - Recursively processing nested arrays for further dependencies.
   *
   * @private
   * @param {NestedArray} data - The nested array structure to process.
   * @returns {string[]} An array of field dependencies extracted from the nested array.
   */
  private getFieldDependencies(data: NestedArray): string[] {
    const result: string[] = [];
    for (const item of data) {
      if (
        Array.isArray(item) &&
        item.length === 3 &&
        typeof item[0] === 'string'
      ) {
        result.push(item[0]);
        if (typeof item[2] === 'string' && item[2].startsWith('$')) {
          result.push(item[2].slice(1));
        }
      } else if (Array.isArray(item)) {
        result.push(...this.getFieldDependencies(item));
      }
    }
    return result;
  }

  // TODO refactor
  request<T>(
    method: HttpMethod,
    url: string,
    params: { data?: any; headers?: { [header: string]: string } }
  ): Observable<any> {
    const options: any = params?.headers
      ? { headers: new HttpHeaders(params?.headers) }
      : {};
    if (params.data && ['POST', 'PUT', 'PATCH'].includes(method)) {
      options.body = params.data;
    } else if (params?.data && method === 'GET') {
      options.params = new HttpParams({ fromObject: params.data });
    }
    return this.http.request<T>(method, url, options);
  }
}
