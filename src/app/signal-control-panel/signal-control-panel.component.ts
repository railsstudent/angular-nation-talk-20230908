import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { SpeedUpPipe, getTextColor } from '../core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { pairwise } from 'rxjs';

@Component({
  selector: 'app-signal-control-panel',
  standalone: true,
  imports: [NgFor, SpeedUpPipe],
  template: `
  <h1>Signal RxJS Interop Demo</h1>
    <div>
      <span>Speed:</span>
      <button *ngFor="let value of [5, 10, 30, 50];trackBy: trackByIndex" (click)="speedSignal.set(value)">{{ value }}</button>
    </div>
    <div>
      <span>Skip:</span>
      <button *ngFor="let value of [-30, -15, 10, 20];trackBy: trackByIndex" (click)="calculateSkip(value)">{{ value }}</button>
    </div>
    <div>
      <span>Volume:</span>
      <button (click)="adjustVolume(-1)">-</button>
      <button (click)="adjustVolume(1)">+</button>
    </div>
    <ul>
      <li>Current Time: <span [style.color]="skipStyle()">{{ skipSignal() }}</span></li>
      <li>Speed: <span [style.color]="speedStyle()">{{ speedPair() | speedUp }}</span></li>
      <li>Volume: <span>{{ volSignal() }}</span></li>
    </ul>
  `,
  styles: [`
    :host {
      display: block;
    }

    div {
      padding: 0.5rem;
    }

    button {
      margin-right: 0.25rem;
      padding: 0.25rem;
    }

    ul {
      padding: 1.5rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalControlPanelComponent {
  speedSignal = signal(0, { equal: () => false });
  skipSignal = signal(0);
  volSignal = signal(0);

  speedPair = toSignal(
    toObservable(this.speedSignal).pipe(pairwise()), 
    { initialValue: [0, 0] as [number, number] }
  );

  speedStyle = computed(() => { 
    const [prev = 0, curr] = this.speedPair() || [];
    return getTextColor(curr - prev);
  });

  skipStyle = computed(() => getTextColor(this.skipSignal()));

  trackByIndex(index: number): number {
    return index;
  }

  adjustVolume(delta: number) {
    this.volSignal.update((v) => v + delta);
  }

  calculateSkip(delta: number) {
    this.skipSignal.update((s) => s + delta);
  }
}
