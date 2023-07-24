import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPartnerComponent } from './form-partner.component';

describe('RegisterPartnerComponent', () => {
  let component: FormPartnerComponent;
  let fixture: ComponentFixture<FormPartnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormPartnerComponent]
    });
    fixture = TestBed.createComponent(FormPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
