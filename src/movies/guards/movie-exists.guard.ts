import { Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';

import { Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {tap, filter, take, switchMap, map} from 'rxjs/operators';

import * as fromStore from '../store';

import {Movie} from '../models/Movie';

@Injectable()
export class MovieExistsGuard implements CanActivate {
  constructor(private store: Store<fromStore.AppState>) {}

  canActivate(route: ActivatedRouteSnapshot ) {
    return this.checkStore().pipe(switchMap(() => {
      const id = route.params.id;
      return this.hasMovie(id);

    }));
  }

  hasMovie(id: number): Observable<boolean> {
    return this.store.select(fromStore.getMoviesEntities).pipe(
      map((entities: {[key: string]: Movie}) => !!entities[id]),
      take(1)
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getMoviesLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadMovies());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
