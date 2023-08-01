import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectionDesDonneesDialogComponent } from './protection-des-donnees-dialog.component';

describe('ProtectionDesDonneesDialogComponent', () => {
  let component: ProtectionDesDonneesDialogComponent;
  let fixture: ComponentFixture<ProtectionDesDonneesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProtectionDesDonneesDialogComponent]
    });
    fixture = TestBed.createComponent(ProtectionDesDonneesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
