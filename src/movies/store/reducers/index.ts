import * as fromMovies from './movies.reducer';
import { ActionReducerMap, createFeatureSelector} from '@ngrx/store';


export interface AppState {
  movies: fromMovies.MoviesState;
}

export const reducers: ActionReducerMap<AppState> = {
  movies: fromMovies.reducer
};

export const getAppState = createFeatureSelector<AppState>('app');
