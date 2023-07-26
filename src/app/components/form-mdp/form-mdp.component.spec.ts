import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMdpComponent } from './form-mdp.component';

describe('FormMdpComponent', () => {
  let component: FormMdpComponent;
  let fixture: ComponentFixture<FormMdpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMdpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
