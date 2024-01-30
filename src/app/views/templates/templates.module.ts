import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';
import { ListComponent } from './list/list.component';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { DetailsComponent } from './details/details.component';
import { SharedModules } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListComponent,
    CreateTemplateComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    SharedModules
  ]
})
export class TemplatesModule { }
