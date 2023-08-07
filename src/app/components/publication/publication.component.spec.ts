import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionsComponent } from './publication.component';

describe('InteractionsComponent', () => {
  let component: InteractionsComponent;
  let fixture: ComponentFixture<InteractionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
