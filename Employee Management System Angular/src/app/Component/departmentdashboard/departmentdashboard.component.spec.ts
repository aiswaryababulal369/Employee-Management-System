import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentdashboardComponent } from './departmentdashboard.component';

describe('DepartmentdashboardComponent', () => {
  let component: DepartmentdashboardComponent;
  let fixture: ComponentFixture<DepartmentdashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentdashboardComponent]
    });
    fixture = TestBed.createComponent(DepartmentdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
