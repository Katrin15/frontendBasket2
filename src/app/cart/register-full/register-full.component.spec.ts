import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFullComponent } from './register-full.component';

describe('RegisterFullComponent', () => {
  let component: RegisterFullComponent;
  let fixture: ComponentFixture<RegisterFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
