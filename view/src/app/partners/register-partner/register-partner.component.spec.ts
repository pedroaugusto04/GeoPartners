import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPartnerComponent } from './register-partner.component';

describe('RegisterPartnerComponent', () => {
  let component: RegisterPartnerComponent;
  let fixture: ComponentFixture<RegisterPartnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPartnerComponent]
    });
    fixture = TestBed.createComponent(RegisterPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
