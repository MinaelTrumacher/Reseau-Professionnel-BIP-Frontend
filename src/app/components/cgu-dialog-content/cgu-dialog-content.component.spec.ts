import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CguDialogContentComponent } from './cgu-dialog-content.component';

describe('ModalCguContentComponent', () => {
  let component: CguDialogContentComponent;
  let fixture: ComponentFixture<CguDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CguDialogContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CguDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
