import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import {reducers, effects} from './store';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import * as fromServices from './services';
import * as fromGuards from './guards';

export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [fromGuards.MovieGuard],
    component: fromContainers.MoviesComponent,
  },
  {
    path: 'new',
    canActivate: [fromGuards.MovieGuard],
    component: fromComponents.MovieComponent,
  },
  {
    path: ':id',
    canActivate: [fromGuards.MovieExistsGuard],
    component: fromComponents.MovieFormComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('app' , reducers),
    EffectsModule.forFeature(effects),
    FormsModule,
  ],
  providers: [...fromServices.services, ...fromGuards.guards],
  declarations: [...fromContainers.containers, ...fromComponents.components ],
  exports: [...fromContainers.containers],
})
export class MoviesModule {}
