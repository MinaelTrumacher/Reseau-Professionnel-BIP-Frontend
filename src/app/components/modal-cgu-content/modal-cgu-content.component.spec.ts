import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCguContentComponent } from './modal-cgu-content.component';

describe('ModalCguContentComponent', () => {
  let component: ModalCguContentComponent;
  let fixture: ComponentFixture<ModalCguContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCguContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCguContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
