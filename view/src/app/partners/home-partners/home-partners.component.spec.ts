import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePartnersComponent } from './home-partners.component';

describe('HomePartnersComponent', () => {
  let component: HomePartnersComponent;
  let fixture: ComponentFixture<HomePartnersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePartnersComponent]
    });
    fixture = TestBed.createComponent(HomePartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
