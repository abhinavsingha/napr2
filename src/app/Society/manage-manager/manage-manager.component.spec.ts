import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageManagerComponent } from './manage-manager.component';

describe('ManageManagerComponent', () => {
  let component: ManageManagerComponent;
  let fixture: ComponentFixture<ManageManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
