import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSelectFieldComponent } from './select-field.component';

describe('SelectFieldComponent', () => {
  let component: NgxSelectFieldComponent;
  let fixture: ComponentFixture<NgxSelectFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxSelectFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxSelectFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
