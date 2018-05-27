import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelEditBookComponent } from './admin-panel-edit-book.component';

describe('AdminPanelEditBookComponent', () => {
  let component: AdminPanelEditBookComponent;
  let fixture: ComponentFixture<AdminPanelEditBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelEditBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelEditBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
