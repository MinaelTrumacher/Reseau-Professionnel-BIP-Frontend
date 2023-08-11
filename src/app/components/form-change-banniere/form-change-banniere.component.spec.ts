import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChangeBanniereComponent } from './form-change-banniere.component';

describe('FormChangeBanniereComponent', () => {
  let component: FormChangeBanniereComponent;
  let fixture: ComponentFixture<FormChangeBanniereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormChangeBanniereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormChangeBanniereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
