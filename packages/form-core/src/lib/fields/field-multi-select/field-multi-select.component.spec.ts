import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxFieldMultiSelectComponent } from './field-multi-select.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('FieldMultiSelectComponent', () => {
  let component: NgxFieldMultiSelectComponent;
  let fixture: ComponentFixture<NgxFieldMultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxFieldMultiSelectComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxFieldMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
