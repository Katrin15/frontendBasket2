import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaLoginedComponent } from './area-logined.component';

describe('AreaLoginedComponent', () => {
  let component: AreaLoginedComponent;
  let fixture: ComponentFixture<AreaLoginedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaLoginedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaLoginedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
