import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetTypeReportComponent } from './pet-type-report.component';

describe('PetTypeReportComponent', () => {
  let component: PetTypeReportComponent;
  let fixture: ComponentFixture<PetTypeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetTypeReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetTypeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
