import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareersRoutingModule } from './careers-routing.module';
import { CareersComponent } from './careers.component';
import { SharedModules } from '../../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AccordionModule, BadgeModule, BreadcrumbModule, ButtonModule, CardModule,
CarouselModule, CollapseModule, DropdownModule, FormModule, GridModule, SharedModule } from '@coreui/angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [
    CareersComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    CareersRoutingModule,
    CommonModule,
    SharedModules,
    SharedModule,
    MatMenuModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CardModule,
    CarouselModule,
    CollapseModule,
    DropdownModule,
    FormModule,
    GridModule,
    CKEditorModule,
    MatFormFieldModule,
    MatInputModule,
   MatSelectModule,
   MatSelectModule,
   MatButtonModule,
  
  ]
})
export class CareersModule { }
