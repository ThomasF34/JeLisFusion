import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelNavbarComponent } from './admin-panel-navbar.component';

describe('AdminPanelNavbarComponent', () => {
  let component: AdminPanelNavbarComponent;
  let fixture: ComponentFixture<AdminPanelNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
