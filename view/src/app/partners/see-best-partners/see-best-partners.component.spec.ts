import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeBestPartnersComponent } from './see-best-partners.component';

describe('SeeBestPartnersComponent', () => {
  let component: SeeBestPartnersComponent;
  let fixture: ComponentFixture<SeeBestPartnersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeeBestPartnersComponent]
    });
    fixture = TestBed.createComponent(SeeBestPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
