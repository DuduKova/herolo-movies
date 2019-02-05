import {TestBed} from '@angular/core/testing';
import {StoreModule, Store, combineReducers} from '@ngrx/store';

import * as fromRoot from '../../../app/store/reducers';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from '../selectors/movies.selectors';

import {Movie} from '../../models/Movie';

describe('Movies Selectors', () => {
  let store: Store<fromReducers.AppState>;
  const movie1: Movie = {
    id: 1,
   Title: 'ahah'
  };

  const movie2: Movie = {
    id: 2,
    Title: 'xexe'
  };

  const movie3: Movie = {
    id: 3,
    Title: 'ahbababah'
  };

  const movies: Movie[] = [movie1, movie2, movie3];

  const entities = {
    1: movies[0],
    2: movies[1],
    3: movies[2],
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          movies: combineReducers(fromReducers.reducers),
        }),
      ],
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getMoviesEntities', () => {
    it('should return movies as entities', () => {
      let result;

      store.select(fromSelectors.getMoviesEntities).subscribe(value => result = value);

        expect(result).toEqual({});

        store.dispatch(new fromActions.LoadMoviesSuccess(movies));

        expect(result).toEqual(entities);
      });
    });
});
