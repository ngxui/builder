import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxCheckboxFieldComponent } from './checkbox-field.component';

describe('CheckboxFieldComponent', () => {
  let component: NgxCheckboxFieldComponent;
  let fixture: ComponentFixture<NgxCheckboxFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxCheckboxFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxCheckboxFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
