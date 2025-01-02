import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioFieldComponent } from './radio-field.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('RadioFieldComponent', () => {
  let component: RadioFieldComponent;
  let fixture: ComponentFixture<RadioFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioFieldComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],

    }).compileComponents();

    fixture = TestBed.createComponent(RadioFieldComponent);
    component = fixture.componentInstance;
    component.field = {name: 'f1', type: 'input'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
