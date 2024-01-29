import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingServiceComponent } from './listing-service.component';

describe('ListingServiceComponent', () => {
  let component: ListingServiceComponent;
  let fixture: ComponentFixture<ListingServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
