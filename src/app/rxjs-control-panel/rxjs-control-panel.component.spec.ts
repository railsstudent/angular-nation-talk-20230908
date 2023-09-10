import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsControlPanelComponent } from './rxjs-control-panel.component';

describe('RxjsControlPanelComponent', () => {
  let component: RxjsControlPanelComponent;
  let fixture: ComponentFixture<RxjsControlPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RxjsControlPanelComponent]
    });
    fixture = TestBed.createComponent(RxjsControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
