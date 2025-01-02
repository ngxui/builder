import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormCoreComponent } from './form-core.component';

class MockFormCoreComponent extends FormCoreComponent {
  setFieldMap() {
    this.fieldsMap = {};
  }
}
describe('FormCoreComponent', () => {
  let component: MockFormCoreComponent;
  let fixture: ComponentFixture<MockFormCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockFormCoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MockFormCoreComponent);
    component = fixture.componentInstance;
    component.formConfig = {name: 'user', rows: []};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // TODO Tests
});
