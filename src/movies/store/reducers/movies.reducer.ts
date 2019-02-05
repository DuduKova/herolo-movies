import * as fromMovies from '../actions/movies.actions';
import {Movie} from '../../models/Movie';

export interface MoviesState {
  entities: { [id: string]: Movie };
  loaded: boolean;
  loading: boolean;
}

export const initialState: MoviesState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromMovies.MoviesActions
): MoviesState {
  switch (action.type) {
    case fromMovies.LOAD_MOVIES_FIRST_TIME:
    case fromMovies.LOAD_MOVIES: {
      return {
        ...state,
        loading: true,
      };
    }
    case fromMovies.LOAD_MOVIES_SUCCESS: {
      const entities = action.payload.reduce(
        (entities: { [id: string]: Movie }, movie: Movie) => {
          return {
            ...entities,
            // @ts-ignore
            [movie.id]: movie
          };
        }, {
          ...state.entities
        });
      return {
        ...state,
        loading: false,
        loaded: true,
        entities,
      };
    }
    case fromMovies.LOAD_MOVIES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case fromMovies.UPDATE_MOVIE:
    case fromMovies.CREATE_MOVIE: {
      const movie = action.payload;
      const entities = {
        ...state.entities,
        [movie.id]: movie,
      };

      return {
        ...state,
        entities
      };
    }
    case fromMovies.REMOVE_MOVIE: {
      const movie = action.payload;
      const {[movie.id]: removed, ...entities} = state.entities;
      return {
        ...state,
        entities,
      };
    }
  }
  return state;
}

export const getMoviesLoading = (state: MoviesState) => state.loading;
export const getMoviesLoaded = (state: MoviesState) => state.loaded;
export const getMoviesEntities = (state: MoviesState) => state.entities;
