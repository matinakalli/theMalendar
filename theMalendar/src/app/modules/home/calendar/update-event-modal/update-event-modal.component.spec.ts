import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEventModalComponent } from './update-event-modal.component';

describe('UpdateEventModalComponent', () => {
  let component: UpdateEventModalComponent;
  let fixture: ComponentFixture<UpdateEventModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEventModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEventModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
