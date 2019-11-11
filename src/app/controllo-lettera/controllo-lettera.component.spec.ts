import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlloLetteraComponent } from './controllo-lettera.component';

describe('ControlloLetteraComponent', () => {
  let component: ControlloLetteraComponent;
  let fixture: ComponentFixture<ControlloLetteraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlloLetteraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlloLetteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
