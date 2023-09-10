import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, map, timer } from 'rxjs';
import { takeMap } from './custom-operators/take-while.operator';

const from = 10
const SECOND = 1000
const TWO_SECONDS = 2000
const THREE_SECONDS = 3000

@Component({
  selector: 'app-combine-latest-counter',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  template: `
    <div *ngIf="something$ | async as something">
      <span>something:</span> {{ something.a }}, {{ something.b }}, {{ something.c }}
    </div>
    <div>
      <span>toSignal:</span>
      {{ sthSignal()?.a }}, {{ sthSignal()?.b }}, 
      {{ sthSignal()?.c }}
    </div>
    <div>
      Signal counter: {{ a() }}, {{ b() }}, {{ c() }}
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    div {
      padding: 0.25rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CombineLatestCounterComponent implements OnInit {
  something$ = combineLatest([
    timer(0, SECOND).pipe(takeMap(from)),
    timer(0, TWO_SECONDS).pipe(takeMap(from)),
    timer(0, THREE_SECONDS).pipe(takeMap(from)), 
  ]).pipe(
    map(([a,b,c]) => ({
      a: a * 2, 
      b: b * 3,
      c: c * 5,
    }))
  );

  sthSignal = toSignal(this.something$);

  counterSignal = signal(1);
  counter2Signal = signal(1);
  counter3Signal = signal(1);

  a = computed(() => this.counterSignal() * 2);
  b = computed(() => this.counter2Signal() * 3);
  c = computed(() => this.counter3Signal() * 5);
    
  ngOnInit(): void {
    const intervalId = setInterval(() => {
      this.counterSignal.update((v) => v + 1);
      if (this.counterSignal() >= from) {
        clearInterval(intervalId);
      }
    }, SECOND);

    const intervalId2 = setInterval(() => {
      this.counter2Signal.update((v) => v + 1);
      if (this.counter2Signal() >= from) {
        clearInterval(intervalId2);
      }
    }, TWO_SECONDS);

    const intervalId3 = setInterval(() => {
      this.counter3Signal.update((v) => v + 1);
      if (this.counter3Signal() >= from) {
        clearInterval(intervalId3);
      }
    }, THREE_SECONDS);
  }
}
