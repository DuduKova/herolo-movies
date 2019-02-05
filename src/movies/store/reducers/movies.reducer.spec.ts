import * as fromMovies from './movies.reducer';
import * as fromActions from '../actions/movies.actions';
import { Movie} from '../../models/Movie';

describe('MoviesReducer', () => {
  describe('undefined action', () => {
    it('should return the default state' , () => {
      const { initialState } = fromMovies;
      const action = {} as any;
      const state = fromMovies.reducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });
  describe('LOAD_MOVIES action', () => {
    it('should set loading to true' , () => {
      const { initialState } = fromMovies;
      const action = new fromActions.LoadMovies();
      const state = fromMovies.reducer(initialState, action);
      expect(state.entities).toEqual({});
      expect(state.loaded).toEqual(false);
      expect(state.loading).toEqual(true);
    });
  });
  describe('LOAD_MOVIES_SUCCESS action', () => {
    it('should map an array to entities' , () => {
      const movies: Movie[] = [
        {
          id: 1,
          Title: '123',
          Year: '123',
          Runtime: '123',
          Genre: '123',
          Director: '123',
        },
        {
          id: 2,
          Title: '123',
          Year: '123',
          Runtime: '123',
          Genre: '123',
          Director: '123',
        }
      ];
      const entities = {
        1: movies[0],
        2: movies[1]
      };
      const { initialState } = fromMovies;
      const action = new fromActions.LoadMoviesSuccess(movies);
      const state = fromMovies.reducer(initialState, action);
      expect(state.entities).toEqual(entities);
      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
    });
  });
});
