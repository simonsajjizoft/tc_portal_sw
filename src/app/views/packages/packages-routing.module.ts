import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreatePackageComponent } from './create-package/create-package.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {path:'',
    component:ListComponent,
    
  },
  {
    path:'create',
    component:CreatePackageComponent
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
export class PackagesRoutingModule { }
