import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeePartnersComponent } from './see-partners.component';

describe('SeePartnersComponent', () => {
  let component: SeePartnersComponent;
  let fixture: ComponentFixture<SeePartnersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeePartnersComponent]
    });
    fixture = TestBed.createComponent(SeePartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
