import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, } from 'rxjs';
import {Movie} from '../../models/Movie';
import * as fromStore from '../../store';
import {MovieFormComponent} from '../../components';
import { filter, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'movies',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  exists = false;
  movies$: Observable<Movie[]>;
  loading: Observable<boolean>;
  entities$: Observable<{}>;
  selectedMovie: Movie;
  @ViewChild('deleteModal') public deleteModal;
  @ViewChild('formModal') public formModal;
  @ViewChild('alertModal') public alertModal;
  @ViewChild(MovieFormComponent) public movieForm;

  constructor(private store: Store<fromStore.AppState>) {
  }

  ngOnInit() {
    this.movies$ = this.store.select(fromStore.getAllMovies);
    this.loading = this.store.select(fromStore.getMoviesLoaded);
    this.entities$ = this.store.select(fromStore.getMoviesEntities);
  }

  onCreate(event: Movie) {
    const check = this.movies$.pipe(
      mergeMap(movies => movies),
      filter(movie => movie.Title === event.Title)
    );
    let check2;
    check.subscribe(value => check2 = value);
    if (check2) {
      return this.alertModal.show();
    } else {
      this.store.dispatch(new fromStore.CreateMovie(event));
    }
  }

  onUpdate(event: Movie) {
    const check = this.movies$.pipe(
      mergeMap(movies => movies),
      filter(movie => movie.id === event.id));
    let check2;
    check.subscribe(value => check2 = value);
    if (check2.id === event.id && check2.Title === event.Title) {
      this.store.dispatch(new fromStore.UpdateMovie(event));
    } else {
      return this.alertModal.show();
    }
  }
  onRemove(event: Movie) {
    this.confirmDelete(event);
  }

  openFormModal() {
    this.formModal.show();
  }

  openFormModalEdit(movie: Movie) {
    this.selectedMovie = movie;
    this.exists = true;
    this.formModal.show();
  }

  onFormModalClosed() {
    this.formModal.hide();
    this.movieForm.title = 'Add Movie';
    this.exists = false;
    this.movieForm.form.reset();
  }

  onCloseDeleteModal(movie: Movie) {
    this.onFormModalClosed();
    this.deleteModal.hide();
    this.deleteModal.selectedMovie = null;
    this.store.dispatch(new fromStore.RemoveMovie(movie));
  }

  closeAlertModal() {
    this.alertModal.hide();
  }

  onCancelDeleteModal() {
    this.deleteModal.hide();
  }

  confirmDelete(movie: Movie) {
    this.selectedMovie = movie;
    this.deleteModal.show();
  }
}
