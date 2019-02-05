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
import {Observable} from 'rxjs';

@Component({
  selector: 'app-movie-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnChanges {
  exists = false;
  title = 'Add Movie';
  @Input() movie: Movie;

  @Output() selected = new EventEmitter<Movie>();
  @Output() create = new EventEmitter<Movie>();
  @Output() update = new EventEmitter<Movie>();
  @Output() remove = new EventEmitter<Movie>();
  @Output() hide = new EventEmitter();

  form = this.fb.group({
    Title: ['', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[a-zA-Z0-9._-]+$')])],
    Director: ['', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z ]*')])],
    Runtime: ['', Validators.compose([
      Validators.required,
      Validators.maxLength(4),
      Validators.pattern('^[0-9]*$')])],
    Year: ['', Validators.compose([
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
      Validators.pattern('^[0-9]*$')
    ])],
    Genre: ['', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z ]*')
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

  get nameControlInvalid() {
    return this.titleControl.hasError('required') && this.titleControl.touched;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.movie) {
      this.exists = true;
      this.title = 'Edit Movie';
      this.form.patchValue(this.movie);
    } else {
      this.form.reset();
    }

  }

  closeModal() {
    this.hide.emit();
    this.movie = null;
    this.form.reset();
  }

  createMovie(form: FormGroup) {
    const {value, valid} = form;
    if (valid) {
      this.create.emit(value);
    }
    this.closeModal();
  }

  updateMovie(form: FormGroup) {
    const {value, valid, touched} = form;
    if (touched && valid) {
      this.update.emit({...this.movie, ...value});
    }
    this.closeModal();
  }

  removeMovie(form: FormGroup) {
    const {value} = form;
    this.remove.emit({...this.movie, ...value});
  }
}
