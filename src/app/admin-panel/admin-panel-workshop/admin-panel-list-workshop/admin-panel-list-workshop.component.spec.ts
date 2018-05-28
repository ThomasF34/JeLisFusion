import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelListWorkshopComponent } from './admin-panel-list-workshop.component';

describe('AdminPanelListWorkshopComponent', () => {
  let component: AdminPanelListWorkshopComponent;
  let fixture: ComponentFixture<AdminPanelListWorkshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelListWorkshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelListWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
