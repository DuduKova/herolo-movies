import { Action } from '@ngrx/store';
import {Movie} from '../../models/Movie';

export const LOAD_MOVIES = 'Load Movies';
export const LOAD_MOVIES_FIRST_TIME = 'Load Movies First Time';
export const LOAD_MOVIES_FAIL = 'Load Movies Fail';
export const LOAD_MOVIES_SUCCESS = 'Load Movies Success';

export class LoadMovies implements Action {
  readonly type = LOAD_MOVIES;
}
export class LoadMoviesFirstTime implements Action {
  readonly type = LOAD_MOVIES_FIRST_TIME;
}
export class LoadMoviesFail implements Action {
  readonly type = LOAD_MOVIES_FAIL;
  constructor(public payload: any) {}
}
export class LoadMoviesSuccess implements Action {
  readonly type = LOAD_MOVIES_SUCCESS;
  constructor(public payload: Movie[]) {}
}

export const CREATE_MOVIE = 'Create Movie';
export const CREATE_MOVIE_FAIL = 'Create Movie Fail';
export const CREATE_MOVIE_SUCCESS = 'Create Movie Success';

export class CreateMovie implements Action {
  readonly type = CREATE_MOVIE;
  constructor(public payload: Movie) {}
}

export class CreateMovieFail implements Action {
  readonly type = CREATE_MOVIE_FAIL;
  constructor(public payload: any) {}
}

export class CreateMovieSuccess implements Action {
  readonly type = CREATE_MOVIE_SUCCESS;
  constructor(public payload: Movie) {}
}

export const UPDATE_MOVIE = 'Update Movie';
export const UPDATE_MOVIE_FAIL = 'Update Movie Fail';
export const UPDATE_MOVIE_SUCCESS = 'Update Movie Success';

export class UpdateMovie implements Action {
  readonly type = UPDATE_MOVIE;
  constructor(public payload: Movie) {}
}

export class UpdateMovieFail implements Action {
  readonly type = UPDATE_MOVIE_FAIL;
  constructor(public payload: any) {}
}

export class UpdateMovieSuccess implements Action {
  readonly type = UPDATE_MOVIE_SUCCESS;
  constructor(public payload: Movie) {}
}

export const REMOVE_MOVIE = 'Remove Movie';
export const REMOVE_MOVIE_FAIL = 'Remove Movie Fail';
export const REMOVE_MOVIE_SUCCESS = 'Remove Movie Success';

export class RemoveMovie implements Action {
  readonly type = REMOVE_MOVIE;
  constructor(public payload: Movie) {}
}

export class RemoveMovieFail implements Action {
  readonly type = REMOVE_MOVIE_FAIL;
  constructor(public payload: any) {}
}

export class RemoveMovieSuccess implements Action {
  readonly type = REMOVE_MOVIE_SUCCESS;
  constructor(public payload: Movie) {}
}


// actions types

export type MoviesActions = LoadMoviesFirstTime | LoadMovies | LoadMoviesFail | LoadMoviesSuccess
  | CreateMovie | CreateMovieFail | CreateMovieSuccess
  | UpdateMovie | UpdateMovieFail | UpdateMovieSuccess
  | RemoveMovie | RemoveMovieFail | RemoveMovieSuccess;
