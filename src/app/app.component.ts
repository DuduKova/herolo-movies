import {Component, ViewChild} from '@angular/core';
import {MoviesComponent} from '../movies/containers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'herolo';
  @ViewChild(MoviesComponent) private moviesComponent;

  onCreate() {
    this.moviesComponent.openFormModal();
  }
}
