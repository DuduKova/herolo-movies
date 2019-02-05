import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {throwError} from 'rxjs';
import {catchError, map, mergeMap, reduce} from 'rxjs/operators';
import {Movie} from '../models/Movie';
import * as _ from 'lodash';

const KEY = 'f6e4a6dd';

@Injectable()
export class MoviesService {
  constructor(private http: HttpClient) {}
  getMoviesFirst() {
    return this.http.get(`http://www.omdbapi.com/?apikey=${KEY}&s=batman&type=movie`)
      // @ts-ignore
      .pipe(mergeMap(res => res.Search as Movie[]),
        mergeMap(movie => {
          return this.http.get(`https://www.omdbapi.com/?apikey=${KEY}&t=${movie.Title}`);
        }),
        map((movie, index) => ({id: index, ..._.pick(movie, ['Title', 'Director' , 'Year' , 'Runtime' , 'Genre'])})),
        reduce((acc, value) => acc.concat([value]), []),
        catchError((error: any) => throwError(error.json())));
  }
}
