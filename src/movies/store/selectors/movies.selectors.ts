import {createSelector} from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromMovies from '../reducers/movies.reducer';
import * as fromFeature from '../reducers';
import { Movie} from '../../models/Movie';

export const getMoviesState = createSelector(fromFeature.getAppState , (state: fromFeature.AppState) => state.movies );

export const getMoviesEntities = createSelector(getMoviesState , fromMovies.getMoviesEntities);
export const getMoviesLoaded = createSelector(getMoviesState , fromMovies.getMoviesLoaded);
export const getMoviesLoading = createSelector(getMoviesState , fromMovies.getMoviesLoading);

export const getSelectedMovie = createSelector(
  getMoviesEntities,
  fromRoot.getRouterState,
  (entities, router): Movie => {
    return router.state && entities[router.state.params.id];
  }
);

export const getAllMovies = createSelector(getMoviesEntities, entities => {
  return Object.keys(entities).map(id => entities[id]);
});
