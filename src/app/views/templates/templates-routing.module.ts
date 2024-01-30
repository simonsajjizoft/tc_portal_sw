import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { DetailsComponent } from './details/details.component';


const routes: Routes = [
  {path:'',
    component:ListComponent,
    
  },
  {
    path:'create',
    component:CreateTemplateComponent
  },
  {
    path:'details',
    component:DetailsComponent
  }
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule { }
