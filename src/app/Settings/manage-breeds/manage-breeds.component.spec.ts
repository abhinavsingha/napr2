import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBreedsComponent } from './manage-breeds.component';

describe('ManageBreedsComponent', () => {
  let component: ManageBreedsComponent;
  let fixture: ComponentFixture<ManageBreedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBreedsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBreedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
