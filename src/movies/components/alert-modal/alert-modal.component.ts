import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {
  @Output() closeAlert = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  closeAlertModal() {
    this.closeAlert.emit();
  }

}
