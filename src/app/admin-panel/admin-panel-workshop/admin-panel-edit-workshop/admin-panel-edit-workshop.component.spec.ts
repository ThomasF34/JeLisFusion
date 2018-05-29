import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelEditWorkshopComponent } from './admin-panel-edit-workshop.component';

describe('AdminPanelEditWorkshopComponent', () => {
  let component: AdminPanelEditWorkshopComponent;
  let fixture: ComponentFixture<AdminPanelEditWorkshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelEditWorkshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelEditWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
