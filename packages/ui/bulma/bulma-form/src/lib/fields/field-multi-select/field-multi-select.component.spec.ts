import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldMultiSelectComponent } from './field-multi-select.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('FieldMultiSelectComponent', () => {
  let component: FieldMultiSelectComponent;
  let fixture: ComponentFixture<FieldMultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldMultiSelectComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(FieldMultiSelectComponent);
    component = fixture.componentInstance;
    component.field = {name: 'f1', type: 'input'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
