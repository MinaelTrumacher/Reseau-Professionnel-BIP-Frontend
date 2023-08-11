import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormParcoursComponent } from './form-parcours.component';

describe('FormParcoursComponent', () => {
  let component: FormParcoursComponent;
  let fixture: ComponentFixture<FormParcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormParcoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormParcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
