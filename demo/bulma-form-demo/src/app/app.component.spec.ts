import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlumaDemoComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let component: BlumaDemoComponent;
  let fixture: ComponentFixture<BlumaDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlumaDemoComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    fixture = TestBed.createComponent(BlumaDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // TODO Tests
});
