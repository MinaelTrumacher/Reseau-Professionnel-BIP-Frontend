import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CguDialogComponent } from './cgu-dialog.component';

describe('ModalCguComponent', () => {
  let component: CguDialogComponent;
  let fixture: ComponentFixture<CguDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CguDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CguDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
