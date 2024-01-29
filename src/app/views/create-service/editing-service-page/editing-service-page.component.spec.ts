import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingServicePageComponent } from './editing-service-page.component';

describe('EditingServicePageComponent', () => {
  let component: EditingServicePageComponent;
  let fixture: ComponentFixture<EditingServicePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditingServicePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditingServicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
