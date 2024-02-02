import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExercisesRoutingModule } from './exercises-routing.module';
import { CreateExerciseComponent } from './create-exercise/create-exercise.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { SharedModules } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CreateExerciseComponent,
    ListComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    ExercisesRoutingModule,
    SharedModules
  ]
})
export class ExercisesModule { }
