import { Component, OnInit } from '@angular/core';
import { FormConfig } from '@ngxui/form-core';
import { HttpClient} from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { formDemo } from '../../public/demo';
import { NgIf } from '@angular/common';
import { NgxBulmaFormBuilderComponent } from '@ngxui/bulma-form';

@Component({
  imports: [NgIf, NgxBulmaFormBuilderComponent],
  selector: 'app-bluma-demo',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [],

})
export class BlumaDemoComponent implements OnInit {
  title = 'bulma-form-demo';
  url = 'http://localhost:8000/view/form';
  formConfig: FormConfig;
  formGroup: FormGroup = new FormGroup({});
  isSubmitted: boolean;

  constructor(private httpClient: HttpClient) {}

  loadConfig() {
    this.httpClient.get(this.url).subscribe((formConfig) => {
      this.formConfig = <FormConfig>formConfig;
    });
  }

  ngOnInit(): void {
    this.formConfig = formDemo;
    // this.loadConfig()
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.formGroup.valid) {
      console.log('form value', this.formGroup.value);
    }
  }
}
