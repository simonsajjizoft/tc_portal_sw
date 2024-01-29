import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CaseStudyComponent} from './case-study.component'
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: CaseStudyComponent,
  },
  {
    path: 'create',
    component: CaseStudyComponent,
  },
  {
    path: 'edit',
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseStudyRoutingModule { }
