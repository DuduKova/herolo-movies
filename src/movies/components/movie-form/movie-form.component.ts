import {
  Component, Input,
  Output, EventEmitter, OnChanges, SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormControl, FormGroup,
  FormBuilder, Validators,
} from '@angular/forms';

import {Movie} from '../../models/Movie';

@Component({
  selector: 'app-movie-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnChanges {
  @Input() exists: boolean;
  title = 'Add Movie';
  @Input() selectedMovie: Movie;
  id = 11;

  @Output() selected = new EventEmitter<Movie>();
  @Output() create = new EventEmitter<Movie>();
  @Output() update = new EventEmitter<Movie>();
  @Output() remove = new EventEmitter<Movie>();
  @Output() hide = new EventEmitter();

  form = this.fb.group({
    id: [this.id],
    Title: ['', Validators.compose([
      Validators.required,
      Validators.minLength(1),
      Validators.pattern('^[a-zA-Z0-9., -]+$')
    ])],
    Director: ['', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z ]*')
    ])],
    Runtime: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9., -]+$')
    ])],
    Year: ['', Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
      Validators.pattern('^[0-9]*$')
    ])],
    Genre: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9., -]+$')
    ])],
    Poster: ['', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)')
    ])],
  });

  constructor(private fb: FormBuilder) {}
  get titleControl() {
    return this.form.get('Title') as FormControl;
  }
  get directorControl() {
    return this.form.get('Director') as FormControl;
  }
  get runtimeControl() {
    return this.form.get('Runtime') as FormControl;
  }
  get yearControl() {
    return this.form.get('Year') as FormControl;
  }
  get genreControl() {
    return this.form.get('Genre') as FormControl;
  }

  get posterControl() {
    return this.form.get('Poster') as FormControl;
  }

  get idControl() {
    return this.form.get('id') as FormControl;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.exists) {
      this.title = 'Edit Movie';
      this.form.patchValue(this.selectedMovie);
      this.form.touched;
    } else {
      this.form.reset();
    }
  }

  closeModal() {
    this.hide.emit();
    this.form.reset();
  }

  createMovie(form: FormGroup) {
    this.id ++;
    const {value, valid} = form;
    if (valid) {
      this.create.emit(value);
    }
    this.closeModal();
  }

  updateMovie(form: FormGroup) {
    const {value, valid, touched} = form;
    if (touched && valid) {
      this.update.emit({...this.selectedMovie, ...value});
    }
    this.closeModal();
  }

  removeMovie(form: FormGroup) {
    const {value} = form;
    this.remove.emit({...this.selectedMovie, ...value});
  }
}
