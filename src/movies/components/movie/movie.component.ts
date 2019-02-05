import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Movie} from '../../models/Movie';

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {
  @Input() movie: Movie;
  @Output() selectedMovie = new EventEmitter<Movie>();
  @Output() remove = new EventEmitter();
  movieSelected(movie) {
    this.selectedMovie.emit(movie);
  }
  constructor() {}

  onRemove(event) {
    this.remove.emit(event);
  }
}
