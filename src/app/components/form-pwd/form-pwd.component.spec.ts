import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPwdComponent } from './form-pwd.component';

describe('FormPwdComponent', () => {
  let component: FormPwdComponent;
  let fixture: ComponentFixture<FormPwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPwdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
