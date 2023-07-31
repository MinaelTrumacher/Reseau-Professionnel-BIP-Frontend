import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationpublicationComponent } from './creationpublication.component';

describe('CreationpublicationComponent', () => {
  let component: CreationpublicationComponent;
  let fixture: ComponentFixture<CreationpublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationpublicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationpublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
