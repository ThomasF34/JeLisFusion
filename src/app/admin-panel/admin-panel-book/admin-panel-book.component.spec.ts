import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelBookComponent } from './admin-panel-book.component';

describe('AdminPanelBookComponent', () => {
  let component: AdminPanelBookComponent;
  let fixture: ComponentFixture<AdminPanelBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
