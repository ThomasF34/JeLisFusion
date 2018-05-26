import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelAddBookComponent } from './admin-panel-add-book.component';

describe('AdminPanelAddBookComponent', () => {
  let component: AdminPanelAddBookComponent;
  let fixture: ComponentFixture<AdminPanelAddBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelAddBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelAddBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
