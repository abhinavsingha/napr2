import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSocietyComponent } from './manage-society.component';

describe('ManageSocietyComponent', () => {
  let component: ManageSocietyComponent;
  let fixture: ComponentFixture<ManageSocietyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSocietyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSocietyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
