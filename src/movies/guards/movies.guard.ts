import { Injectable} from '@angular/core';
import { CanActivate} from '@angular/router';
import { Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import { tap, filter , take, switchMap , catchError} from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable()
export class MovieGuard implements CanActivate {
  constructor(private store: Store<fromStore.AppState>) { }

  canActivate() {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getMoviesLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadMoviesFirstTime());
        } else {
          this.store.dispatch(new fromStore.LoadMovies());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
