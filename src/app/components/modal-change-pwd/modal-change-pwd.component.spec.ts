import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChangePwdComponent } from './modal-change-pwd.component';

describe('ModalChangePwdComponent', () => {
  let component: ModalChangePwdComponent;
  let fixture: ComponentFixture<ModalChangePwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalChangePwdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalChangePwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
