import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxTextareaFieldComponent } from './textarea-field.component';

describe('TextareaFieldComponent', () => {
  let component: NgxTextareaFieldComponent;
  let fixture: ComponentFixture<NgxTextareaFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxTextareaFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxTextareaFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
