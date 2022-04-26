import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifCardComponent } from './notif-card.component';

describe('NotifCardComponent', () => {
  let component: NotifCardComponent;
  let fixture: ComponentFixture<NotifCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
