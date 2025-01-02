import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilderService } from './services/form-builder.service';
import { FormConfig } from './form.model';
import { FormGroup } from '@angular/forms';

@Component({
  imports: [],
  template: '',
  standalone: true,
  providers: [],
})
/**
 * A component responsible for managing a dynamic form group, generating the necessary controls
 * from the provided form configuration and integrating it with the parent form group.
 */
export class FormContainerComponent implements OnInit, OnDestroy {
  @Input({ required: true }) parentFormGroup: FormGroup; // Parent form group to which the dynamic form group will be added.
  @Input({ required: true }) isSubmitted = false; // Tracks whether the form has been submitted.
  @Input({ required: true }) formConfig: FormConfig ; // The configuration for the dynamic form group.

  destroy$ = new Subject<void>(); // Subject for managing cleanup on component destruction.

  /**
   * Constructor that injects the `FormBuilderService` to facilitate form group creation and configuration.
   *
   * @param {FormBuilderService} formBuilderService - The service used to build and manage form groups.
   */
  constructor(private formBuilderService: FormBuilderService) {}

  /**
   * Generates the form group based on the provided `formConfig` and adds it to the `parentFormGroup`.
   * This method is called when the form configuration is set.
   *
   * @returns {void}
   */
  generateFormGroup(): void {
    if (this.parentFormGroup) {
      this.formBuilderService.setFormGroups(
        this.formConfig,
        this.parentFormGroup
      );
    }
  }
  ngOnInit(): void {
    if(!this.formConfig || !this.parentFormGroup){
      throw new Error('formConfig && parentFormGroup is Required');
    }
    this.generateFormGroup();
  }


  /**
   * Cleanup method invoked when the component is destroyed.
   * It emits a value to complete the `destroy$` subject and unsubscribes from any observables.
   *
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
