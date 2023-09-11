import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent, map, merge, pairwise, scan, shareReplay, startWith } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';
import { SpeedUpPipe, getTextColor } from '../core';

@Component({
  selector: 'app-rxjs-control-panel',
  standalone: true,
  imports: [SpeedUpPipe, AsyncPipe, NgFor],
  template: `
    <h1>RxJS Control Panel</h1>
    <div>
      <span>Speed:</span>
      <button *ngFor="let value of [5, 10, 30, 50];trackBy: trackByIndex" (click)="speedSub.next(value)">{{ value }}</button>
    </div>
    <div>
      <span>Skip:</span>
      <button *ngFor="let value of [-30, -15, 10, 20];trackBy: trackByIndex" (click)="skipSub.next(value)">{{ value }}</button>
    </div>
    <div>
      <span>Volume:</span>
      <button #down>-</button>
      <button #up>+</button>
    </div>
    <ul>
      <li>Current Time: <span [style.color]="skipStyle$ | async">{{ skip$ | async }}</span></li>
      <li>Speed: <span [style.color]="speedStyle$ | async">{{ speed$ | async | speedUp }}</span></li>
      <li>Volume: <span>{{ vol$ | async }}</span></li>
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
export class RxjsControlPanelComponent {
  @ViewChild('up', { static: true, read: ElementRef })
  btnUp!: ElementRef<HTMLButtonElement>;

  @ViewChild('down', { static: true, read: ElementRef })
  btnDown!: ElementRef<HTMLButtonElement>;

  speedSub = new BehaviorSubject(0);
  speed$ = this.speedSub
    .pipe(
      pairwise(),
      startWith([0, 0] as [number, number]),
      shareReplay(1),
    );
  speedStyle$ = this.speed$.pipe(map(([prev, curr]) => getTextColor(curr - prev)));

  skipSub = new BehaviorSubject(0);
  skip$ = this.skipSub.pipe(
    scan((acc, v) => acc + v, 0),
    shareReplay(1),
  );
  skipStyle$ = this.skip$.pipe(map((value) => getTextColor(value)));

  vol$!: Observable<number>; 

  ngOnInit(): void {
    const up$ = fromEvent(this.btnUp.nativeElement, 'click').pipe(map(() => 1));
    const down$ = fromEvent(this.btnDown.nativeElement, 'click').pipe(map(() => -1));

    this.vol$ = merge(up$, down$).pipe(
      scan((acc, v) => acc + v, 0),
      startWith(0)
    );
  }

  trackByIndex(index: number): number {
    return index;
  }
}
