import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {map, switchMap, catchError} from 'rxjs/operators';
import * as moviesActions from '../actions/movies.actions';
import * as fromServices from '../../services';
import {of} from 'rxjs';
import * as _ from 'lodash';

@Injectable()
export class MoviesEffects {
  constructor(private actions$: Actions, private movieService: fromServices.MoviesService) {}
  @Effect()
  loadMoviesFirstTime$ = this.actions$.pipe(ofType(moviesActions.LOAD_MOVIES_FIRST_TIME),
    switchMap(() => {
      return this.movieService.getMoviesFirst().pipe(
        map(movies => _.uniqBy(movies , 'Title')),
        map(movies => new moviesActions.LoadMoviesSuccess(movies)),
        catchError(err => of(new moviesActions.LoadMoviesFail(err))));
    }));
}

