import * as fromMovies from './movies.actions';

describe('Movies Actions' , () => {
  describe('LoadMovies Actions' , () => {
    describe('LoadMovies' , () => {
      it('should create an action', () => {
        const action = new fromMovies.LoadMovies();
        expect({...action}).toEqual({
          type: fromMovies.LOAD_MOVIES,
        });
      });
    });
    describe('LoadMoviesFail' , () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error'};
        const action = new fromMovies.LoadMoviesFail(payload);
        expect({...action}).toEqual({
          type: fromMovies.LOAD_MOVIES_FAIL,
          payload
        });
      });
    });
    describe('LoadMoviesSuccess' , () => {
      it('should create an action', () => {
        const payload = [{
          id: 2,
        Title: '123',
        Year: '123',
        Runtime: '123',
        Genre: '123',
        Director: '123',
        },
          {
            id: 1,
            Title: '123',
            Year: '123',
            Runtime: '123',
            Genre: '123',
            Director: '123',
          }];
        const action = new fromMovies.LoadMoviesSuccess(payload);
        expect({...action}).toEqual({
          type: fromMovies.LOAD_MOVIES_SUCCESS,
          payload
        });
      });
    });
  });
});
