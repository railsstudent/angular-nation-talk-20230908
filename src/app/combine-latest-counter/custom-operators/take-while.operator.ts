import { map, Observable, take } from "rxjs"

export function takeMap(numElements: number) {
  return function(source: Observable<any>) {
    return source.pipe(
      take(numElements),
      map((v) => v + 1),
    )
  }
}
