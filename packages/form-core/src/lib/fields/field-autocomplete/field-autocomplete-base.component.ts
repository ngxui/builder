import { Component, inject, OnInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base.component';
import { FormBuilderService } from '../../services/form-builder.service';
import { takeUntil } from 'rxjs';
import { LabelValue } from '@ngxui/common';

@Component({
  selector: 'ngxui-form-autocomplete-base',
  imports: [],
  template: '',
})
export class NxFieldAutocompleteBaseComponent
  extends FieldBaseComponent
  implements OnInit
{
  isLazyLoadedEnable: boolean;
  options: LabelValue[];
  formService = inject(FormBuilderService)

  constructor() {
    super();
  }

  fetchAndApplyOptions(filterValue: any) {
    if(!this.isLazyLoadedEnable){
      return;
    }
    const loader = this.field?.options?.loader;
    if (!loader?.dataUrl) {
      throw Error('dataUrl is missing');
    }
    const fieldValue = loader.nestedField
      ? filterValue[loader.nestedField]
      : filterValue;
    const params = { data: { search: fieldValue }, headers: loader.header };
    const httpMethod = loader?.requestMethod || 'GET';
    this.formService
      .request(httpMethod, loader.dataUrl, params)
      .pipe(takeUntil(this.destroy$))
      .subscribe((options) => {
        this.options = options;
      });
  }

  ngOnInit(): void {
    this.isLazyLoadedEnable = !!this.field?.options?.loader?.isLazyLoadEnabled;
    this.options = this.field?.options?.optionsList || [];
  }
}
