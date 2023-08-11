import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChangePpComponent } from './form-change-pp.component';

describe('FormChangePpComponent', () => {
  let component: FormChangePpComponent;
  let fixture: ComponentFixture<FormChangePpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormChangePpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormChangePpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
