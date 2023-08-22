import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSectorComponent } from './manage-sector.component';

describe('ManageSectorComponent', () => {
  let component: ManageSectorComponent;
  let fixture: ComponentFixture<ManageSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
