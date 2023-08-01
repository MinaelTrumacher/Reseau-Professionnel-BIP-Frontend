import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionsLegalesDialogComponent } from './mentions-legal-dialog.component';

describe('MentionsLegalesDialogComponent', () => {
  let component: MentionsLegalesDialogComponent;
  let fixture: ComponentFixture<MentionsLegalesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MentionsLegalesDialogComponent]
    });
    fixture = TestBed.createComponent(MentionsLegalesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
