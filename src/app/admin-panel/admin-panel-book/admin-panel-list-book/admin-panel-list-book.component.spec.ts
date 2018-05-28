import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelListBookComponent } from './admin-panel-list-book.component';

describe('AdminPanelListBookComponent', () => {
  let component: AdminPanelListBookComponent;
  let fixture: ComponentFixture<AdminPanelListBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelListBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelListBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
