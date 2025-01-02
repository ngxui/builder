import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxRadioFieldComponent } from './radio-field.component';

describe('RadioFieldComponent', () => {
  let component: NgxRadioFieldComponent;
  let fixture: ComponentFixture<NgxRadioFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxRadioFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxRadioFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
