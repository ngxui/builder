import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxFieldAutocompleteComponent } from './field-autocomplete.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('NgxFieldAutocompleteComponent', () => {
  let component: NgxFieldAutocompleteComponent;
  let fixture: ComponentFixture<NgxFieldAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxFieldAutocompleteComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxFieldAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
