import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingServiceComponent } from './listing-service/listing-service.component'; 
import { CreateServiceComponent } from './create-service.component'; 
import { EditingServicePageComponent } from './editing-service-page/editing-service-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "list",
    pathMatch: "full"

  },
  {
    path: 'list',
    component: ListingServiceComponent,

  },
  
  {
    path: 'create',
    component: CreateServiceComponent,
  },
  {
    path:'edit',
    component:EditingServicePageComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateServiceRoutingModule { }
