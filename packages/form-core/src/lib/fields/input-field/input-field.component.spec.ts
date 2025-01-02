import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxInputFieldComponent } from './input-field.component';

describe('InputFieldComponent', () => {
  let component: NgxInputFieldComponent;
  let fixture: ComponentFixture<NgxInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxInputFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
