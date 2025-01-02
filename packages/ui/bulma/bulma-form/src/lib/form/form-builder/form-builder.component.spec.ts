import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBulmaFormBuilderComponent } from './form-builder.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormGroup } from '@angular/forms';

describe('FormBuilderComponent', () => {
  let component: NgxBulmaFormBuilderComponent;
  let fixture: ComponentFixture<NgxBulmaFormBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxBulmaFormBuilderComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxBulmaFormBuilderComponent);
    component = fixture.componentInstance;
    component.parentFormGroup = new FormGroup({});
    component.formConfig = {name: 'test', groups: []};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // TODO add  Tests
});
