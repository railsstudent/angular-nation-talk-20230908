import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalControlPanelComponent } from './signal-control-panel.component';

describe('SignalControlPanelComponent', () => {
  let component: SignalControlPanelComponent;
  let fixture: ComponentFixture<SignalControlPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SignalControlPanelComponent]
    });
    fixture = TestBed.createComponent(SignalControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
