import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMessagerieComponent } from './dialog-messagerie.component';

describe('DialogMessagerieComponent', () => {
  let component: DialogMessagerieComponent;
  let fixture: ComponentFixture<DialogMessagerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMessagerieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogMessagerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
