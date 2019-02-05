import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Movie} from '../../models/Movie';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Output() hide = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Input() selectedMovie;

  constructor() { }

  ngOnInit() {
  }

  closeModal() {
    this.hide.emit();
  }

  closeModalAndDelete() {
    this.delete.emit(this.selectedMovie);
  }

}
