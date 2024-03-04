import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackagesRoutingModule } from './packages-routing.module';
import { CreatePackageComponent } from './create-package/create-package.component';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { SharedModules } from 'src/app/shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';



@NgModule({
  declarations: [
    CreatePackageComponent,
    DetailsComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    PackagesRoutingModule,
    SharedModules,
    InfiniteScrollModule
  ],
})
export class PackagesModule { }
