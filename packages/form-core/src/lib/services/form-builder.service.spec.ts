import { TestBed } from '@angular/core/testing';
import { FieldValidatorService } from './field-validator.service';

describe('FormBuilderService', () => {
  let service: FieldValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });
    service = TestBed.inject(FieldValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  // TODO add  Tests
});
