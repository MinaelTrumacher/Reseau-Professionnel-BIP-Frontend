import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAjoutConversationComponent } from './dialog-ajout-conversation.component';

describe('DialogAjoutConversationComponent', () => {
  let component: DialogAjoutConversationComponent;
  let fixture: ComponentFixture<DialogAjoutConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAjoutConversationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAjoutConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
