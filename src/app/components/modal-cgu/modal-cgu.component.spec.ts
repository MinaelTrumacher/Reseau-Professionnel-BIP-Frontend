import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCguComponent } from './modal-cgu.component';

describe('ModalCguComponent', () => {
  let component: ModalCguComponent;
  let fixture: ComponentFixture<ModalCguComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCguComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
