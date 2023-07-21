import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestPartnersComponent } from './best-partners.component';

describe('BestPartnersComponent', () => {
  let component: BestPartnersComponent;
  let fixture: ComponentFixture<BestPartnersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BestPartnersComponent]
    });
    fixture = TestBed.createComponent(BestPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
