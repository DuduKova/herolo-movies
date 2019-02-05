import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Movie} from '../../models/Movie';
import * as fromStore from '../../store';
import {MovieFormComponent} from '../../components';

@Component({
  selector: 'movies',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies$: Observable<Movie[]>;
  selectedMovie: Movie;
  @ViewChild('deleteModal') public deleteModal;
  @ViewChild('formModal') public formModal;
  @ViewChild(MovieFormComponent) public movieForm;

  constructor(private store: Store<fromStore.AppState>) {}

  ngOnInit() {
     this.movies$ = this.store.select(fromStore.getAllMovies);
  }
  onCreate(event: Movie) {
    this.store.dispatch(new fromStore.CreateMovie(event));
  }

  onUpdate(event: Movie) {
    this.store.dispatch(new fromStore.UpdateMovie(event));
  }

  onRemove(event: Movie) {
    this.confirmDelete(event);
  }

  openFormModal(movie: Movie) {
    if (movie) {
      this.selectedMovie = movie;
    }
    this.formModal.show();
  }

  closeFormModal() {
    this.formModal.hide();
  }

  onFormModalClosed() {
    this.movieForm.title = 'Add Movie';
    this.movieForm.exists = false;
  }

  onCloseDeleteModal(movie: Movie) {
    this.store.dispatch(new fromStore.RemoveMovie(movie));
    this.closeFormModal();
    this.deleteModal.hide();
    this.deleteModal.movie = null;
    this.formModal.exists = false;
  }

  onCancelDeleteModal() {
    this.deleteModal.hide();
  }

  confirmDelete(movie: Movie) {
    this.selectedMovie = movie;
    this.deleteModal.show();
  }
}
