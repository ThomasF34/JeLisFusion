import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelAddWorkshopComponent } from './admin-panel-add-workshop.component';

describe('AdminPanelAddWorkshopComponent', () => {
  let component: AdminPanelAddWorkshopComponent;
  let fixture: ComponentFixture<AdminPanelAddWorkshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelAddWorkshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelAddWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
