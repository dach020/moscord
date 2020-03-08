import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeedsRoutingModules } from './feeds.routes';
import { HomeComponent } from './components';
import { MatSnackBarModule, MatListModule, MatCardModule, MatGridListModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FeedsRoutingModules,
    MatSnackBarModule,
    MatListModule,
    MatCardModule,
    MatGridListModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [],
  exports: [ ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class FeedsModule { }
