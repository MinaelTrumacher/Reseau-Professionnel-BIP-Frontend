import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreatePublicationComponent } from './form-create-publication.component';

describe('CreationpublicationComponent', () => {
  let component: FormCreatePublicationComponent;
  let fixture: ComponentFixture<FormCreatePublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCreatePublicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreatePublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
