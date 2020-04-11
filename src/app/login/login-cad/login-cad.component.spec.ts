import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCadComponent } from './login-cad.component';

describe('LoginCadComponent', () => {
  let component: LoginCadComponent;
  let fixture: ComponentFixture<LoginCadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginCadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
