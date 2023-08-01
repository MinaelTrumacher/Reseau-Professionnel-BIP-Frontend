import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContactComponent } from './form-contact.component';

describe('ContactFormComponent', () => {
  let component: FormContactComponent;
  let fixture: ComponentFixture<FormContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
