import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldAutocompleteComponent } from './field-autocomplete.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('FieldAutocompleteComponent', () => {
  let component: FieldAutocompleteComponent;
  let fixture: ComponentFixture<FieldAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldAutocompleteComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(FieldAutocompleteComponent);
    component = fixture.componentInstance;
    component.field = {name: 'f1', type: 'input'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
