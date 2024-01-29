import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SafehtmlPipe} from './safehtml.pipe'
7
@NgModule({
  declarations: [SafehtmlPipe],
  exports: [SafehtmlPipe],
  imports: [CommonModule]
})
export class PipesModule { }
